import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom as deleteRoomApi } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useDeleteRoom() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRoom,
    error,
    isPending,
  } = useMutation({
    mutationFn: deleteRoomApi,
    onMutate: () => {
      const toastId = toast.loading("Deleting room...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room deleted", { id: context.toastId });
    },
    onError: (err, _, context) => {
      const errorMessage =
        err.code === "23503"
          ? "Cannot delete room: This room is presently attached to an existing booking."
          : "Room could not be deleted";
      toast.error(errorMessage, {
        id: context.toastId,
      });
    },
  });

  return { deleteRoom, error, isPending };
}

export default useDeleteRoom;
