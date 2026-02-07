import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getBookingsStats } from "../../services/apiDashboard";

function useDashboardBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lastDays = Number(searchParams.get("lastDays")) || 7;

  const queryClient = useQueryClient();

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

  return {
    bookings: data?.bookings ?? [],
    bookingsCount: data?.bookingsCount ?? 0,
    scheduledTodayCount: data?.scheduledTodayCount ?? 0,
    errorGettingBookings,
    isGettingBookings,
  };
}

export default useDashboardBookings;
