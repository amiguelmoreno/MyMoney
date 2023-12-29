import { HiCog8Tooth, HiMiniTrash } from "react-icons/hi2";
import Table from "../../ui/Table";
import { useDeleteTransaction } from "./useDeleteTransaction";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function TransactionRow({ transaction }) {
  const { deleteTransaction } = useDeleteTransaction();

  return (
    <Table.Row>
      <div>{transaction.concept}</div>
      <div>{formatCurrency(transaction.amount)}</div>
      <div>{transaction.date}</div>
      <div>{transaction.to}</div>
      <div>{transaction.from}</div>
      <div>{transaction.account}</div>
      <div>{transaction.status}</div>
      <div>
        <Button onClick={() => deleteTransaction(transaction.id)}>
          {/*  <HiCog8Tooth /> */}
          <HiMiniTrash />
        </Button>
      </div>
    </Table.Row>
  );
}

export default TransactionRow;
