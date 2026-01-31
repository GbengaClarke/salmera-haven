import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSetting,
    error: errorUpdatingSettings,
    isPending: isUpdatingSettings,
  } = useMutation({
    mutationFn: updateSettingApi,
    onMutate: () => {
      const toastId = toast.loading("We're Updating your Settings...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings successfully saved", { id: context.toastId });
    },
    onError: (err, _, context) => {
      toast.error(err.message || "Settings update failed", {
        id: context.toastId,
      });
    },
  });

  return { updateSetting, errorUpdatingSettings, isUpdatingSettings };
}

export default useUpdateSettings;
