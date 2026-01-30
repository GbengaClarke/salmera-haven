import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function useGetBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const PAGE_SIZE = Number(searchParams.get("pageSize")) || 10;
  // const PAGE_SIZE = Number(searchParams.get("pageSize")) || 10;

  const status = searchParams.get("status") || "all";

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  // const sortBy = { field, direction };

  const page = Number(searchParams.get("page") || "1");

  const queryClient = useQueryClient();

  const {
    data,
    error: errorGettingBookings,
    isPending: isGettingBookings,
  } = useQuery({
    queryFn: () => {
      return getBookings({
        status,
        sortBy: { field, direction },
        PAGE_SIZE,
        page,
      });
    },
    queryKey: ["bookings", status, field, direction, page, PAGE_SIZE],
    keepPreviousData: true,
  });

  const count = data?.count ?? 0;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", status, field, direction, page + 1, PAGE_SIZE],
        queryFn: () =>
          getBookings({
            status,
            sortBy: { field, direction },
            PAGE_SIZE,
            page: page + 1,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", status, field, direction, page - 1, PAGE_SIZE],
        queryFn: () =>
          getBookings({
            status,
            sortBy: { field, direction },
            PAGE_SIZE,
            page: page - 1,
          }),
      });
    }
  }, [page, status, field, direction, PAGE_SIZE, totalPages, queryClient]);

  return {
    bookings: data?.bookings ?? [],
    count: data?.count ?? 0,
    errorGettingBookings,
    isGettingBookings,
    PAGE_SIZE,
  };
}

export default useGetBookings;
