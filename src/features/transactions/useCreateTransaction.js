import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction as createTransactionApi } from "../../../services/apiTransactions";
import toast from "react-hot-toast";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createTransaction } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      toast.success("New transaction created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTransaction };
}
