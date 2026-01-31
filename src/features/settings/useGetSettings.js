import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const {
    isPending: isGettingSettings,
    data: settings,
    error: errorGettingSettings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isGettingSettings, settings, errorGettingSettings };
}

export default useGetSettings;
