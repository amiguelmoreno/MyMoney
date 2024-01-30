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
import { useState } from "react";
import { useEffect } from "react";

function TransactionTable() {
  const [isTableMini, setIsTableMini] = useState(window.innerWidth <= 850);
  const { isLoading, transactions } = useTransactions();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!transactions.length) return <Empty resourceName="transactions" />;

  let filteredTransactions = transactions;

  //filter date
  const filterDateValue = searchParams.get("date") || "all";
  if (filterDateValue === "day-1")
    filteredTransactions = filterTransactionsByDate(transactions, 1);
  if (filterDateValue === "day-7")
    filteredTransactions = filterTransactionsByDate(transactions, 7);
  if (filterDateValue === "month")
    filteredTransactions = filterTransactionsByMonth(transactions);
  if (filterDateValue === "day-30")
    filteredTransactions = filterTransactionsByDate(transactions, 30);
  if (filterDateValue === "day-90")
    filteredTransactions = filterTransactionsByDate(transactions, 90);

  //filter status
  const filterStatusValue = searchParams.get("status") || "all";
  if (filterStatusValue !== "all")
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.status === filterStatusValue
    );

  // filter category
  const filterCategoryValue = searchParams.get("category") || "all";
  if (filterCategoryValue !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.category === filterCategoryValue
    );
  }

  //filter account
  const filterAccountValue = searchParams.get("account") || "all";
  if (filterAccountValue !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.account === filterAccountValue.toUpperCase()
    );
  }

  //filter type
  const filterTypeValue = searchParams.get("type") || "all";
  if (filterTypeValue !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === filterTypeValue
    );
  }

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
    <Table
      columns={
        isTableMini ? "1.2fr 1fr 1fr " : "1fr 2fr 1fr 1fr  1fr 0.8fr 1.4fr"
      }
    >
      <Table.Header>
        <div>Amount</div>
        <div>Date</div>
        {isTableMini ? (
          <></>
        ) : (
          <>
            <div>Concept</div>
            <div>Account</div>
            <div>Category</div>
            <div>Status</div>
          </>
        )}
      </Table.Header>
      <Table.Body
        data={sortedTransactions}
        render={(transaction) => (
          <TransactionRow
            transaction={transaction}
            key={transaction.id}
            isTableMini={isTableMini}
          />
        )}
      />
    </Table>
  );
}

export default TransactionTable;
