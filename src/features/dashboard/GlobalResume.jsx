import styled from "styled-components";
import ChartBox from "../../ui/ChartBox";
import IncomesExpenses from "./IncomesExpenses";
import ResumeData from "./ResumeData";

const StyledGlobalResume = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  padding: 2rem;
  border-radius: 5px;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);

  @media (width <= 1250px) {
    grid-column: 1/4;
  }

  @media (width <= 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }
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
