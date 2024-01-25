import styled from "styled-components";
import FilterDrop from "../../ui/FilterDrop";
import { useDashTransactionContext } from "./DashboardTransactionsContext";
import { useTransactions } from "../transactions/useTransactions";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  arraysEqual,
  filterTransactionsByDate,
  filterTransactionsByMonth,
} from "../../utils/helpers";
import Spinner from "../../ui/Spinner";

const StyledFiltersContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  border-radius: 10px;
`;

function DashTableOperations() {
  const { updateTransactions } = useDashTransactionContext();
  const { isLoading, transactions } = useTransactions();
  const [searchParams] = useSearchParams();

  // Utiliza useState para manejar filteredTransactions
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterDateValue = searchParams.get("date") || "all";

  useEffect(() => {
    if (!isLoading && transactions) {
      // Filtrar transacciones según la lógica de fecha necesaria
      let updatedFilteredTransactions = transactions;

      if (filterDateValue !== "all") {
        if (filterDateValue === "day-1")
          updatedFilteredTransactions = filterTransactionsByDate(
            transactions,
            1
          );
        if (filterDateValue === "day-7")
          updatedFilteredTransactions = filterTransactionsByDate(
            transactions,
            7
          );
        if (filterDateValue === "month")
          updatedFilteredTransactions = filterTransactionsByMonth(transactions);
        if (filterDateValue === "day-30")
          updatedFilteredTransactions = filterTransactionsByDate(
            transactions,
            30
          );
        if (filterDateValue === "day-90")
          updatedFilteredTransactions = filterTransactionsByDate(
            transactions,
            90
          );
      }

      if (!arraysEqual(updatedFilteredTransactions, filteredTransactions)) {
        setFilteredTransactions(updatedFilteredTransactions);
        updateTransactions(updatedFilteredTransactions);
      }
    }
  }, [transactions, updateTransactions, isLoading, filterDateValue]);

  return (
    <StyledFiltersContainer>
      <FilterDrop
        filterField="date"
        options={[
          { value: "all", label: "All Time" },
          { value: "day-1", label: "Last day" },
          { value: "day-7", label: "Last 7 days" },
          { value: "month", label: "This month" },
          { value: "day-30", label: "Last 30 days" },
          { value: "day-90", label: "Last 90 days" },
        ]}
      />
    </StyledFiltersContainer>
  );
}

export default DashTableOperations;
