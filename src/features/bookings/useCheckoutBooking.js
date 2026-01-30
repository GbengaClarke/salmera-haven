import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutBooking as checkoutBookingApi } from "../../services/apiBooking";
import toast from "react-hot-toast";

function useCheckoutBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: checkoutBooking,
    error: errorCheckingout,
    isPending: isCheckingout,
  } = useMutation({
    mutationFn: checkoutBookingApi,
    onMutate: () => {
      const toastId = toast.loading("Checking out...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      // queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ active: true });
      toast.success("Successfully checked out", { id: context.toastId });

      // toast.success(`booking #${data.id} successfully checked out`);
    },
    onError: (err, _, context) => {
      toast.error(err.message || "Checking out failed", {
        id: context.toastId,
      });
    },
  });

  return { checkoutBooking, errorCheckingout, isCheckingout };
}

export default useCheckoutBooking;
