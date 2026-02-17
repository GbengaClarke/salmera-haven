import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    error: errorUpdatingUser,
    isPending: isUpdatingUser,
  } = useMutation({
    mutationFn: updateUserApi,
    onMutate: () => {
      const toastId = toast.loading("Updating user...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User account successfully updated", {
        id: context.toastId,
      });
    },
    onError: (err, _, context) => {
      toast.error(err.message || "User update failed", { id: context.toastId });
    },
  });

  return { updateUser, errorUpdatingUser, isUpdatingUser };
}

export default useUpdateUser;
