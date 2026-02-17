import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onMutate: () => {
      const toastId = toast.loading("Logging out...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("You have been successfully logged out", {
        id: context.toastId,
      });
    },
  });

  return { logout, isLoggingOut };
}

export default useLogout;
