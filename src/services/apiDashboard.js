import { subDays } from "date-fns";
import { supabase } from "./supabase";
import { getToday } from "../utils/helpers";

export async function getBookingsStats({ lastDays = 7 }) {
  const today = getToday();

  const day = subDays(today, lastDays).toISOString();

  const bookingsQuery = supabase
    .from("bookings")
    .select(
      `*,room:rooms ( name ),guest:guests( fullName,email,nationalID,countryFlag )`,
      { count: "exact" }
    )
    .gte("created_at", day);

  const TodaysBookingsQuery = supabase
    .from("bookings")
    .select(`id`, { count: "exact", head: true })
    .gte("startDate", today)
    .lte("startDate", getToday({ end: true }));

  const [
    { data: bookings, count: bookingsCount, error },
    { count: scheduledTodayCount, error: scheduledTodayError },
  ] = await Promise.all([bookingsQuery, TodaysBookingsQuery]);

  if (error || scheduledTodayError) {
    console.error(error);
    throw new Error("Booking stats could not be loaded");
  }

  return { bookings, bookingsCount, scheduledTodayCount };
}

export async function getTodayBookingOverview() {
  const bookingsQuery = supabase
    .from("bookings")
    .select(`*,room:rooms ( name ),guest:guests( fullName,countryFlag )`)
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  const { data: bookingsOverview, error } = await bookingsQuery;

  if (error) {
    console.error(error);
    throw new Error("Booking overview could not be loaded");
  }

  // console.log(bookingsOverview);

  return bookingsOverview;
}

async function test() {
  const x = await getTodayBookingOverview();

  // console.log(data);
  // console.log(count);
}

test();
