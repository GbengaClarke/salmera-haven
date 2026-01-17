import { useSearchParams } from "react-router-dom";
import { sortRooms } from "../utils/sorter";

export function useFilteredSortedRooms(rooms) {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy") || "name-asc";

  let result = rooms;

  if (filter === "no-discount") result = result.filter((r) => r.discount === 0);

  if (filter === "with-discount") result = result.filter((r) => r.discount > 0);

  return sortRooms(result, sortBy);
}
