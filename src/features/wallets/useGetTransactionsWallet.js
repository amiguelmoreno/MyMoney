import { useQuery } from "@tanstack/react-query";
import { getTransactionsFromWallet } from "../../../services/apiWallets";

export function useGetTransactionsWallet(wallet_id) {
  const {
    isLoading,
    data: transactionsFromWallet,
    error,
  } = useQuery({
    queryKey: ["transactions", wallet_id],
    queryFn: () => getTransactionsFromWallet(wallet_id),
  });

  return { isLoading, error, transactionsFromWallet };
}
