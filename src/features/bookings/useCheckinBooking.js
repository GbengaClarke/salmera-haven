import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkinBooking as checkinBookingApi } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

function useCheckinBooking() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  // let toastId;

  const {
    mutate: checkinBooking,
    error: errorCheckingIn,
    isPending: isCheckingIn,
  } = useMutation({
    mutationFn: checkinBookingApi,
    onMutate: () => {
      const toastId = toast.loading(`Checking in booking #${id}...`);
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Booking #${id} successfully Checked in!`, {
        id: context.toastId,
      });
    },
    onError: (err, _, context) => {
      toast.error(err.message || "Checkin failed", { id: context.toastId });
    },
  });

  return { checkinBooking, errorCheckingIn, isCheckingIn };
}

export default useCheckinBooking;
