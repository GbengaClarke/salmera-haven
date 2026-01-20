import { differenceInCalendarDays, formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   })
//     .replace("about ", "")
//     .replace("in", "In");

export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function noonCheckout(value) {
  const day = new Date(value);

  return new Date(day.setUTCHours(12, 0, 0, 0));
}

// ("2026-01-17T00:00:00+00:00");
// const timestamp = "2026-01-01T13:30:18.623+00:00";

export function formatDistanceFromStartDate(value) {
  return formatDistance(parseISO(value), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
}

export function getNumberOfNights(startDate, endDate) {
  return differenceInCalendarDays(parseISO(endDate), parseISO(startDate));
}
