import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";

function useGetBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const {
    data: bookings,
    error: errorGettingBookings,
    isPending: isGettingBookings,
  } = useQuery({
    queryFn: () => {
      return getBookings({ status, sortBy });
    },
    queryKey: ["bookings", status, field, direction],
  });

  return { bookings, errorGettingBookings, isGettingBookings };
}

export default useGetBookings;
