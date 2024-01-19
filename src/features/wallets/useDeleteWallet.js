import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWalletAndTransactions } from "../../../services/apiWallets";
import toast from "react-hot-toast";

export function usedeleteWalletAndTransactions() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteWallet } = useMutation({
    mutationFn: deleteWalletAndTransactions,
    onSuccess: () => {
      toast.success("Wallet successfully deleted");
      //console.log("Wallet deleted");

      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteWallet };
}
