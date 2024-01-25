import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateTransaction as updateTransactionApi } from "../../../services/apiTransactions";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: updateTransaction } = useMutation({
    mutationFn: updateTransactionApi,
    onSuccess: () => {
      toast.success("Transaction edited");

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, updateTransaction };
}
