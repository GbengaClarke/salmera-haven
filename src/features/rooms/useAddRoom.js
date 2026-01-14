import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useAddRoom() {
  const queryClient = useQueryClient();
  const {
    mutate: createRoom,
    error,
    isPending,
  } = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      toast.success("New Room Successfully Created");

      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message) || "Failed to add room",
  });

  return { createRoom, error, isPending };
}

export default useAddRoom;
