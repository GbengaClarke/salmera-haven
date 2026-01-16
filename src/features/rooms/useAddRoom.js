import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditRoom as addEditRoomApi } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useAddEditRoom() {
  const queryClient = useQueryClient();
  const {
    mutate: addEditRoom,
    error,
    isPending: isWorking,
  } = useMutation({
    onMutate: (variables) => {
      const isEditing = Boolean(variables.id);

      const toastId = toast.loading(
        isEditing ? "Editing room..." : "Adding room..."
      );

      return { toastId, isEditing };
    },
    mutationFn: addEditRoomApi,

    onSuccess: (_, variables, context) => {
      const message = context.isEditing
        ? "Room successfully edited"
        : "New room successfully created";

      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success(message, { id: context.toastId });
    },
    onError: (err, _, context) => {
      const message = context.isEditing
        ? "Room edit failed"
        : "Failed to add room";

      toast.error(err.message || message, { id: context.toastId });
    },
  });

  return { addEditRoom, error, isWorking };
}

export default useAddEditRoom;
