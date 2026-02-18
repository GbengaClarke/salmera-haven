import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsStats } from "../../services/apiDashboard";

function useDashboardBookings() {
  const [searchParams] = useSearchParams();

  const lastDays = Number(searchParams.get("lastDays")) || 7;

  const {
    data,
    error: errorGettingBookings,
    isPending: isGettingBookings,
  } = useQuery({
    queryFn: () => {
      return getBookingsStats({
        lastDays,
      });
    },
    queryKey: ["bookings", lastDays],
    keepPreviousData: true,
  });

  // const confirmedStays = data?.bookings?.filter(
  //   (booked) => booked.status === "checked-in"
  // );

  const confirmedStays = data?.bookings?.filter(
    (booked) =>
      booked.status === "checked-in" || booked.status === "checked-out"
  );

  // console.log(confirmedStays);
  // console.log(data?.bookings);

  return {
    bookings: data?.bookings ?? [],
    scheduledTodayCount: data?.scheduledTodayCount ?? 0,
    errorGettingBookings,
    isGettingBookings,
    lastDays,
    confirmedStays,
  };
}

export default useDashboardBookings;
