import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export default function useRooms() {
  const {
    isPending,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { isPending, rooms, error };
}
