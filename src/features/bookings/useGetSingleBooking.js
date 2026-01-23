import { useQuery } from "@tanstack/react-query";
import { getSingleBooking } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

function useGetSingleBooking() {
  const { id } = useParams();

  // console.log(id);

  const {
    data: booking,
    error: errorGettingSingleBooking,
    isPending: isGettingSingleBooking,
  } = useQuery({
    queryFn: () => {
      return getSingleBooking(id);
    },
    queryKey: ["bookings"],
  });

  return { booking, errorGettingSingleBooking, isGettingSingleBooking };
}

export default useGetSingleBooking;
