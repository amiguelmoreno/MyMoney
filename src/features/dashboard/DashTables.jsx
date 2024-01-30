import styled from "styled-components";
import LastIncomeAndExpenseChart from "./LastIncomeAndExpenseChart";
import ExpenseIncomeDistribution from "./ExpenseIncomeDistribution";
import GlobalResume from "./GlobalResume";

const StyledTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

function DashTables() {
  return (
    <StyledTableContainer>
      <GlobalResume></GlobalResume>
      <ExpenseIncomeDistribution></ExpenseIncomeDistribution>
      <LastIncomeAndExpenseChart></LastIncomeAndExpenseChart>
    </StyledTableContainer>
  );
}

export default DashTables;
