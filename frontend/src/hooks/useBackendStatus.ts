import { useQuery } from "@tanstack/react-query";

import { getBackendStatus } from "../services/backendApi";

export function useBackendStatus() {
  return useQuery({
    queryKey: ["backend-status"],
    queryFn: getBackendStatus,
    refetchInterval: 5000
  });
}
