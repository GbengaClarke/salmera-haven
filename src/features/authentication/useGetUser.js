import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useGetUser() {
  const { data: user, isPending } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
}

export default useGetUser;
