import styled from "styled-components";
import ChartBox from "../../ui/ChartBox";
import IncomesExpenses from "./IncomesExpenses";
import ResumeData from "./ResumeData";

const StyledGlobalResume = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  padding: 2rem;
  border-radius: 5px;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
`;

function GlobalResume() {
  return (
    <StyledGlobalResume>
      <ResumeData></ResumeData>
      <ChartBox type="ring">
        <IncomesExpenses></IncomesExpenses>
      </ChartBox>
    </StyledGlobalResume>
  );
}

export default GlobalResume;
