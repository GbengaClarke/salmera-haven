import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkinBooking as checkinBookingApi } from "../../services/apiBooking";
import toast from "react-hot-toast";

function useCheckinBooking() {
  const queryClient = useQueryClient();

  const { mutate: checkinBooking, isPending: isCheckingIn } = useMutation({
    mutationFn: (obj) => checkinBookingApi(obj),

    onMutate: (variables) => {
      const toastId = toast.loading(`Checking in ${variables.fullName}...`);
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success(`${variables.fullName} successfully checked in!`, {
        id: context.toastId,
      });

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (err, variables, context) => {
      toast.error(err.message || "There was an error while checking in", {
        id: context.toastId,
      });
    },
  });

  return { checkinBooking, isCheckingIn };
}

export default useCheckinBooking;
