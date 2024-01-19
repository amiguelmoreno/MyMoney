import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWallet as createWalletApi } from "../../../services/apiWallets";
import toast from "react-hot-toast";

export function useCreateWallet() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createWallet } = useMutation({
    mutationFn: createWalletApi,
    onSuccess: () => {
      toast.success("New wallet successfully created");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createWallet };
}
