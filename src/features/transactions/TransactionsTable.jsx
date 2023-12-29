import Table from "../../ui/Table";
import TransactionRow from "./TransactionRow";
import { useTransactions } from "./useTransactions";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import {
  filterTransactionsByDate,
  filterTransactionsByMonth,
} from "../../utils/helpers";

function TransactionTable() {
  const { isLoading, transactions } = useTransactions();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!transactions.length) return <Empty resourceName="transactions" />;

  //filter date
  const filterValue = searchParams.get("date") || "all";

  let filteredTransactions;
  if (filterValue === "all") filteredTransactions = transactions;
  if (filterValue === "day-1")
    filteredTransactions = filterTransactionsByDate(transactions, 1);
  if (filterValue === "day-7")
    filteredTransactions = filterTransactionsByDate(transactions, 7);
  if (filterValue === "month")
    filteredTransactions = filterTransactionsByMonth(transactions);
  if (filterValue === "day-30")
    filteredTransactions = filterTransactionsByDate(transactions, 30);
  if (filterValue === "day-90")
    filteredTransactions = filterTransactionsByDate(transactions, 90);

  //filter status

  // sort

  const sortBy = searchParams.get("sortBy") || "date-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    // Comparar según el tipo de campo
    if (field === "concept" || field === "date") {
      const aValue = a[field].toLowerCase(); // Convertir a minúsculas para ordenar de manera insensible a mayúsculas
      const bValue = b[field].toLowerCase();
      return (aValue > bValue ? 1 : -1) * modifier;
    } else if (field === "amount") {
      return (a[field] - b[field]) * modifier;
    }
    return; // Manejar cualquier otro caso
  });

  return (
    <Table columns="2fr 1fr 1fr 1fr 1fr 1fr 1fr  0.5fr">
      <Table.Header>
        <div>Concept</div>
        <div>Amount</div>
        <div>Date</div>
        <div>To</div>
        <div>From</div>
        <div>Account</div>
        <div>Status</div>
      </Table.Header>
      <Table.Body
        data={sortedTransactions}
        render={(transaction) => (
          <TransactionRow transaction={transaction} key={transaction.id} />
        )}
      />
    </Table>
  );
}

export default TransactionTable;
