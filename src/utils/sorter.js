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
