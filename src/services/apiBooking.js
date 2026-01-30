import { supabase } from "./supabase";

// const params = new URLSearchParams(window.location.search);

// export const PAGE_SIZE = params.get("pageSize");

// export const PAGE_SIZE = 5;

export async function getBookings({ status, sortBy, page, PAGE_SIZE }) {
  let query = supabase.from("bookings").select(
    `
      id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,
       room:rooms ( name ),
       guest:guests( fullName,email )
       `,
    { count: "exact" }
  );

  //filter status
  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (sortBy?.field && sortBy.field !== "fullName") {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  query = query.order("fullName", {
    ascending: true,
    referencedTable: "guests",
  });

  //pagination
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  query = query.range(start, end);

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }

  // client side sorting
  if (sortBy?.field === "fullName") {
    data.sort((a, b) => {
      const nameA = a.guest.fullName.toLowerCase();
      const nameB = b.guest.fullName.toLowerCase();

      return sortBy.direction === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  return { bookings: data, count };
}

//sorting name issue
// export async function getBookings({ status, sortBy, page }) {
//   let query = supabase.from("bookings").select(
//     `
//         id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,
//         room:rooms ( name ),
//         guest:guests ( fullName,email )
//       `,
//     { count: "exact" }
//   );

//   // Filter
//   if (status !== "all") {
//     query = query.eq("status", status);
//   }

//   // Sorting (SERVER SIDE ONLY)
//   if (sortBy?.field === "fullName") {
//     query = query.order("fullName", {
//       ascending: sortBy.direction === "asc",
//       referencedTable: "guests",
//     });
//   } else if (sortBy?.field) {
//     query = query.order(sortBy.field, {
//       ascending: sortBy.direction === "asc",
//     });
//   }

//   // Pagination
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE - 1;
//   query = query.range(start, end);

//   const { data, count, error } = await query;

//   if (error) throw new Error("Booking could not be loaded");

//   return { bookings: data, count };
// }

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

export async function checkoutBooking(object) {
  const { error } = await supabase
    .from("bookings")
    .update({ status: object.status })
    .eq("id", object.id);

  if (error) {
    console.error(error);
    throw new Error("Checkout failed");
  }
}

export async function checkinBooking(object) {
  const { data, error } = await supabase
    .from("bookings")
    .update(object.values)
    .eq("id", object.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Checkin failed");
  }
}
