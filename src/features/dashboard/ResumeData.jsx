import { format } from "date-fns";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Empty from "../../ui/Empty";
import { useTransactions } from "../transactions/useTransactions";
import { useDashTransactionContext } from "./DashboardTransactionsContext";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";
import { useState } from "react";

const StyledListaConEstilo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 400;
`;

const StyledItemLista = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: end;
  width: max-content;
`;

const StyledDato = styled.div`
  text-align: left;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const PuntosIntermedios = styled.span`
  flex-grow: 1;
  border-bottom: 1px dashed #000;
  margin: 0 0px;
`;

const StyledValorDato = styled.span`
  text-align: right;
  white-space: nowrap;
  font-size: 2rem;
  font-weight: 600;
`;

function ResumeData() {
  const { transactions } = useDashTransactionContext();
  const { isLoading } = useTransactions();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [numberTransactions, setNumberTransactions] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);

  useEffect(() => {
    if (!isLoading && transactions) {
      let calculatedTotalAmount = 0;
      let calculatedTotalIncomes = 0;
      let calculatedTotalExpenses = 0;
      let calculatedNumberTransactions = transactions.length;
      let calculatedPendingTransactions = 0;

      transactions.forEach((transaction) => {
        calculatedTotalAmount += transaction.amount;

        if (transaction.type === "income") {
          calculatedTotalIncomes += transaction.amount;
        }
        if (transaction.type === "expense") {
          calculatedTotalExpenses += -transaction.amount;
        }
        if (transaction.status === "pending") {
          calculatedPendingTransactions++;
        }
      });

      setTotalAmount(calculatedTotalAmount);
      setTotalIncomes(calculatedTotalIncomes);
      setTotalExpenses(calculatedTotalExpenses);
      setNumberTransactions(calculatedNumberTransactions);
      setPendingTransactions(calculatedPendingTransactions);
    }
  }, [isLoading, transactions]);

  const data = [
    { nombre: "Total Amount", valor: formatCurrency(totalAmount) },
    { nombre: "Total Incomes", valor: formatCurrency(totalIncomes) },
    { nombre: "Total Expenses", valor: formatCurrency(totalExpenses) },
    { nombre: "Number of transactions", valor: numberTransactions },
    { nombre: "Pending transactions", valor: pendingTransactions },
  ];

  return (
    <StyledListaConEstilo>
      {data.map((info, index) => (
        <StyledItemLista key={index}>
          <StyledDato>
            {info.nombre}
            <PuntosIntermedios />
            {Array(30).fill(".")}
          </StyledDato>
          <StyledValorDato>{`${info.valor}`}</StyledValorDato>
        </StyledItemLista>
      ))}
    </StyledListaConEstilo>
  );
}

export default ResumeData;
