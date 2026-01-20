import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBooking";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBooking,
    error: errorBooking,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: deleteBookingApi,
    onMutate: () => {
      const toastId = toast.loading("Deleting booking...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted", { id: context.toastId });
    },
    onError: (err, _, context) =>
      toast.error(err.message || "Failed to delete booking", {
        id: context.toastId,
      }),
  });

  return { deleteBooking, errorBooking, isDeleting };
}

export default useDeleteBooking;
