import { useSearchParams } from "react-router-dom";

export function sortRooms(rooms, sortBy) {
  if (!sortBy) return rooms;

  const [field, direction] = sortBy.split("-");

  return [...rooms].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    if (typeof valueA === "string") {
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return direction === "asc" ? valueA - valueB : valueB - valueA;
  });
}

export function sortBookings(booking = [], sortBy) {
  const [field, direction] = sortBy.split("-");

  return [...booking].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    if (field === "startDate") {
      return direction === "asc"
        ? new Date(valueA) - new Date(valueB)
        : new Date(valueB) - new Date(valueA);
    }

    return direction === "asc" ? valueA - valueB : valueB - valueA;
  });
}

// export function sortBookings(bookings = [], sortBy) {
//   if (!sortBy) return bookings;

//   const [field, direction] = sortBy.split("-");
//   const modifier = direction === "asc" ? 1 : -1;

//   return [...bookings].sort((a, b) => {
//     let valueA = a[field];
//     let valueB = b[field];

//     // 📅 Date sorting
//     if (field === "startDate" || field === "endDate") {
//       return (new Date(valueA) - new Date(valueB)) * modifier;
//     }

//     // 🔤 String sorting (name, status, etc.)
//     if (typeof valueA === "string") {
//       return valueA.localeCompare(valueB) * modifier;
//     }

//     // 🔢 Number sorting
//     return (valueA - valueB) * modifier;
//   });
// }

export function filterStatus(bookings, searchParams, filterStatus) {
  let filteredBookings = bookings;

  if (filterStatus !== "all") {
    filteredBookings = bookings?.filter(
      (booking) => booking.status === filterStatus
    );
  }

  return filteredBookings;
}
