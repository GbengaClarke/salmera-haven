import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate as getStaysAfterDateApi } from "../../services/apiDashboard";
import { useSearchParams } from "react-router-dom";
import { getToday } from "../../utils/helpers";
import { subDays } from "date-fns";

function useGetStaysAfterDate() {
  const [searchParams] = useSearchParams();

  const lastDays = Number(searchParams.get("lastDays")) || 7;

  const date = subDays(getToday(), lastDays).toISOString();

  const {
    data: stays,
    error: errorgettingStaysAfterDate,
    isPending: isgettingStaysAfterDate,
  } = useQuery({
    queryFn: () => getStaysAfterDateApi(date),
    queryKey: ["stays", `last-${lastDays}`],
  });

  const confirmedStays = stays?.filter(
    (booked) =>
      booked.status === "checked-in" || booked.status === "checked-out"
  );

  // console.log(stays?.length);

  return {
    stays,
    errorgettingStaysAfterDate,
    isgettingStaysAfterDate,
    confirmedStays,
  };
}

export default useGetStaysAfterDate;
