import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryclient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("mERROR", error);
      toast.error("Invalid email or password. Please try again.");
    },
  });

  return { login, isLoggingIn };
}

export default useLogin;
