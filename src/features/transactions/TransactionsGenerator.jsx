import ButtonWithIcon from "../../ui/ButtonWithIcon";
import { HiMiniPlus } from "react-icons/hi2";
import { useTransactions } from "./useTransactions";
import { useCreateTransaction } from "./useCreateTransaction";
import { DATA as transactionsData } from "../../../data/data-transactions";
import { useCreateWallet } from "../wallets/useCreateWallet";

function TransactionsGenerator() {
  const { transactions } = useTransactions();
  const { createTransaction } = useCreateTransaction();
  const { createWallet } = useCreateWallet();

  function handleClick() {
    createWallet({
      name: "ING",
      initialAmount: "0",
      owner: "Migue",
    });

    transactionsData.forEach((transaction) => createTransaction(transaction));
  }

  if (!transactions) return <></>;

  return (
    <div>
      {!transactions.length && (
        <ButtonWithIcon icon={<HiMiniPlus />} onClick={handleClick}>
          Generate some transactions
        </ButtonWithIcon>
      )}
    </div>
  );
}

export default TransactionsGenerator;
