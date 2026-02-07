import { useQuery } from "@tanstack/react-query";
import { getTodayBookingOverview as getTodayBookingOverviewApi } from "../../services/apiDashboard";

function useGetTodayBookingOverview() {
  const {
    data: getTodayBookingOverview,
    error: errorGettingTodayBookingOverview,
    isPending: isGettingTodayBookingOverview,
  } = useQuery({
    queryFn: getTodayBookingOverviewApi,
    queryKey: ["bookings"],
  });

  return {
    getTodayBookingOverview,
    errorGettingTodayBookingOverview,
    isGettingTodayBookingOverview,
  };
}

export default useGetTodayBookingOverview;
