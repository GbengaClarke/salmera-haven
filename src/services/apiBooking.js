import { supabase } from "./supabase";

// export async function getBookings() {
//   const { data: bookings, error } = await supabase.from("bookings").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not be loaded");
//   }

//   return bookings;
// }

// export async function getRoomIdnGuestName(roomId, guestId) {
//   const { data: roomName, error: errorRoomName } = await supabase
//     .from("rooms")
//     .select("name")
//     .eq("id", roomId)
//     .single();

//   if (errorRoomName) {
//     console.error(errorRoomName);
//     throw new Error("Bookings could not be loaded");
//   }

//   const { data: guestName, error: errorGuestName } = await supabase
//     .from("guests")
//     .select("fullName")
//     .eq("id", guestId)
//     .single();

//   if (errorGuestName) {
//     console.error(errorGuestName);
//     throw new Error("Guest name could not be retrieved");
//   }

//   // console.log({ ...guestName, ...roomName });

//   return { ...guestName, ...roomName };
// }

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select(`
      *,
       room:rooms ( name ),
  guest:guests ( fullName,email )
    `);

  if (error) throw new Error("Bookings could not be loaded");

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
