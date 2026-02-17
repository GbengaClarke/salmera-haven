import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../../services/apiAuth";

export function useGoogleLogin() {
  const { mutate: googleLogin, isPending } = useMutation({
    mutationFn: loginWithGoogle,
  });

  return { googleLogin, isPending };
}
