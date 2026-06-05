import { useQuery } from "@tanstack/react-query";

import { listKeys } from "../services/backendApi";

export function useKeyList() {
  return useQuery({
    queryKey: ["keys"],
    queryFn: listKeys,
    refetchInterval: 3000
  });
}
