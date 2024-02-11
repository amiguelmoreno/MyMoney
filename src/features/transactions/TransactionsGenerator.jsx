import ButtonWithIcon from "../../ui/ButtonWithIcon";
import { HiMiniPlus } from "react-icons/hi2";
import { useTransactions } from "./useTransactions";
import { useCreateTransaction } from "./useCreateTransaction";
import { DATA as transactionsData } from "../../../data/data-transactions";
import { useCreateWallet } from "../wallets/useCreateWallet";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { useWallets } from "../wallets/useWallets";

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

    for (const transaction of transactionsData) {
      createTransaction(transaction);
    }
  }

  if (!transactions) return <></>;

  return (
    <div>
      {!transactions.length && (
        <Button onClick={handleClick}>Generate some transactions</Button>
      )}
    </div>
  );
}

export default TransactionsGenerator;
