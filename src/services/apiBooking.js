import { supabase } from "./supabase";

export async function getBookings({ status, sortBy }) {
  let query = supabase.from("bookings").select(
    `
      id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,
       room:rooms ( name ),
       guest:guests( fullName,email )
       `,
    { count: "exact" }
  );

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (sortBy?.field && sortBy.field !== "fullName") {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, count, error } = await query;

  console.log(count);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }

  if (sortBy?.field === "fullName") {
    data.sort((a, b) => {
      const nameA = a.guest.fullName.toLowerCase();
      const nameB = b.guest.fullName.toLowerCase();

      return sortBy.direction === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  return data;
}

export async function getSingleBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `*,room:rooms ( name ),guest:guests( fullName,email,nationalID,countryFlag )`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("This booking could not be loaded");
  }

  return data;
}

export async function deleteBooking(bookingId) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
