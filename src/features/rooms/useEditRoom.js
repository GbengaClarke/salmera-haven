import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRoom as editRoomApi } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useEditRoom() {
  const queryClient = useQueryClient();

  const {
    mutate: editRoom,
    error: errorEditing,
    isPending: isEditing,
  } = useMutation({
    mutationFn: editRoomApi,
    onMutate: () => {
      const toastId = toast.loading("Editing room...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room successfully edited", { id: context.toastId });
    },
    onError: (err, _, context) => {
      toast.error(err.message || "Room edit failed", { id: context.toastId });
    },
  });

  return { editRoom, errorEditing, isEditing };
}

export default useEditRoom;
