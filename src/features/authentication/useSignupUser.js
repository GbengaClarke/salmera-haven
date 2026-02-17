import { useMutation } from "@tanstack/react-query";
import { signupUser as signupUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignupUser() {
  const { mutate: signupUser, isPending: isCreating } = useMutation({
    mutationFn: signupUserApi,
    onMutate: () => {
      const toastId = toast.loading("Creating user...");
      return { toastId };
    },
    onSuccess: (user, __, context) => {
      // console.log(user);
      toast.success(
        "User account successfully created! Please verify new account from the user's email address.",
        {
          id: context.toastId,
        }
      );
    },
    onError: (err, _, context) => {
      toast.error(err.message || "Account creation failed", {
        id: context.toastId,
      });
    },
  });

  return { signupUser, isCreating };
}

export default useSignupUser;
