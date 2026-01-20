import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";

function useGetBookings() {
  const {
    data: bookings,
    error: errorGettingBookings,
    isPending: isGettingBookings,
  } = useQuery({
    queryFn: getBookings,
    queryKey: ["bookings"],
  });

  return { bookings, errorGettingBookings, isGettingBookings };
}

export default useGetBookings;
