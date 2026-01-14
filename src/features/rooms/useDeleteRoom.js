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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room deleted");
    },
    onError: (err) => toast.error(err.message) || "Failed to delete room",
  });

  return { deleteRoom, error, isPending };
}

export default useDeleteRoom;
