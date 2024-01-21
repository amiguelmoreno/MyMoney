import Table from "../../ui/Table";

import { formatCurrency, formatDateDifference } from "../../utils/helpers";

function DashTransactionsRow({ transaction }) {
  return (
    <Table.Row type={transaction.type}>
      <div>{formatCurrency(transaction.amount)}</div>
      <div>{formatDateDifference(transaction.date)}</div>
      <div>{transaction.category}</div>
      <div>{transaction.status}</div>
    </Table.Row>
  );
}

export default DashTransactionsRow;
