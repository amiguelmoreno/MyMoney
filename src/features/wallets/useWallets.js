import { useQuery } from "@tanstack/react-query";
import { getWallets } from "../../../services/apiWallets";

export function useWallets() {
  const {
    isLoading,
    data: wallets,
    error,
  } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  return { isLoading, error, wallets };
}
