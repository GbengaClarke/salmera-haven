import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateRoom as duplicateRoomApi } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useDuplicateRoom() {
  const queryClient = useQueryClient();

  const {
    mutate: duplicateRoom,
    isPending,
    error,
  } = useMutation({
    mutationFn: duplicateRoomApi,

    onMutate: () => {
      const toastId = toast.loading("Duplicating room...");
      return { toastId };
    },

    onSuccess: (_, __, context) => {
      toast.success("Room duplicated successfully", {
        id: context.toastId,
      });

      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },

    onError: (error, _, context) => {
      toast.error(error.message || "Failed to duplicate room", {
        id: context.toastId,
      });
    },
  });

  return { isPending, duplicateRoom, error };
}

export default useDuplicateRoom;
