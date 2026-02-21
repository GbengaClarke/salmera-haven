// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { checkoutBooking as checkoutBookingApi } from "../../services/apiBooking";
// import toast from "react-hot-toast";

// function useCheckoutBooking() {
//   const queryClient = useQueryClient();

//   const {
//     mutate: checkoutBooking,
//     error: errorCheckingout,
//     isPending: isCheckingout,
//   } = useMutation({
//     mutationFn: checkoutBookingApi,
//     onMutate: () => {
//       const toastId = toast.loading("Checking out...");
//       return { toastId };
//     },
//     onSuccess: (_, __, context) => {
//       // queryClient.invalidateQueries({ queryKey: ["bookings"] });
//       queryClient.invalidateQueries({ active: true });
//       toast.success("Successfully checked out", { id: context.toastId });

//       // toast.success(`booking #${data.id} successfully checked out`);
//     },
//     onError: (err, _, context) => {
//       toast.error(err.message || "Checking out failed", {
//         id: context.toastId,
//       });
//     },
//   });

//   return { checkoutBooking, errorCheckingout, isCheckingout };
// }

// export default useCheckoutBooking;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutBooking as checkoutBookingApi } from "../../services/apiBooking";
import toast from "react-hot-toast";

function useCheckoutBooking() {
  const queryClient = useQueryClient();

  const { mutate: checkoutBooking, isPending: isCheckingout } = useMutation({
    // Pass only the ID to the API, while keeping fullName for the toast
    mutationFn: (obj) => checkoutBookingApi(obj),

    onMutate: (variables) => {
      const toastId = toast.loading(`Checking out ${variables.fullName}...`);
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success(`${variables.fullName} successfully checked out!`, {
        id: context.toastId,
      });

      // Invalidate active queries to refresh UI status
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err, variables, context) => {
      toast.error(err.message || "There was an error while checking out", {
        id: context.toastId,
      });
    },
  });

  return { checkoutBooking, isCheckingout };
}

export default useCheckoutBooking;
