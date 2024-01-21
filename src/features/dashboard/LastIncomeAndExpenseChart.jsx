import styled from "styled-components";
import { useTransactions } from "../transactions/useTransactions";
import Heading from "../../ui/Heading";
import Table from "../../ui/Table";

import DashTransactionsRow from "./DashTransactionsRow";
import Empty from "../../ui/Empty";
import { useDashTransactionContext } from "./DashboardTransactionsContext";

const LastIncomeAndExpense = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
`;

const CommonTable = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-50);
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function LastIncomeAndExpenseChart() {
  const { isLoading } = useTransactions();
  const { transactions } = useDashTransactionContext();

  const limitResults = (data, limit) =>
    !isLoading && data ? data.slice(0, limit) : [];

  const expenses =
    !isLoading &&
    transactions
      .filter((transaction) => transaction.type === "expense")
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  const incomes =
    !isLoading &&
    transactions
      .filter((transaction) => transaction.type === "income")
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <LastIncomeAndExpense>
      <CommonTable>
        <Heading as="h3">Last Incomes</Heading>
        <Table columns="1fr 3fr 1fr 1fr">
          <Table.Body
            data={limitResults(incomes, 5)}
            render={(transaction) => (
              <DashTransactionsRow
                transaction={transaction}
                key={transaction.id}
              />
            )}
          />
        </Table>
      </CommonTable>
      <CommonTable>
        <Heading as="h3">Last Expenses</Heading>
        <Table columns="1fr 1fr 1fr 1fr">
          <Table.Body
            data={limitResults(expenses, 5)}
            render={(transaction) => (
              <DashTransactionsRow
                transaction={transaction}
                key={transaction.id}
              />
            )}
          />
        </Table>
      </CommonTable>
    </LastIncomeAndExpense>
  );
}

export default LastIncomeAndExpenseChart;
