import { HiCog8Tooth, HiMiniTrash } from "react-icons/hi2";
import Table from "../../ui/Table";
import { useDeleteTransaction } from "./useDeleteTransaction";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import TransactionMenu from "./TransactionMenu";

function TransactionRow({ transaction, isTableMini }) {
  return (
    <Table.Row type={transaction.type}>
      <div>
        <b>{formatCurrency(transaction.amount)}</b>
      </div>
      <div>{transaction.date}</div>
      {isTableMini ? (
        <></>
      ) : (
        <>
          <div>{transaction.concept}</div>
          <div>{transaction.account}</div>
          <div>{transaction.category}</div>
          <div>{transaction.status}</div>
        </>
      )}
      <div>
        <TransactionMenu transaction={transaction}></TransactionMenu>
      </div>
    </Table.Row>
  );
}

export default TransactionRow;
