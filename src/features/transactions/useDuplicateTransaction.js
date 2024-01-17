import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateTransaction as duplicateTransactionApi } from "../../../services/apiTransactions";
import toast from "react-hot-toast";

export function useDuplicateTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isDuplicating, mutate: duplicateTransaction } =
    useMutation({
      mutationFn: duplicateTransactionApi,
      onSuccess: () => {
        toast.success("Transaction successfully duplicated");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDuplicating, duplicateTransaction };
}
