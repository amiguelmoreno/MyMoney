import styled, { css } from "styled-components";

const StyledChartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Box */

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  ${(props) =>
    props.type === "cheese" &&
    css`
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      height: 60rem;
      padding: 4rem 2rem;
      margin-bottom: 5rem;
    `}

  ${(props) =>
    props.type === "ring" &&
    css`
      height: 32rem;
    `}
`;

function ChartBox({ children, type }) {
  return <StyledChartBox type={type}>{children}</StyledChartBox>;
}

export default ChartBox;
