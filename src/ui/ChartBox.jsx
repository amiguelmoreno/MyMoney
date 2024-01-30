import styled, { css } from "styled-components";

const StyledChartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 45rem;

  /* Box */

  /* & .recharts-pie-label-text {
    font-weight: 600;
  } */

  ${(props) =>
    props.type === "cheese" &&
    css`
      background-color: var(--color-grey-100);
      border: 1px solid var(--color-grey-200);
      border-radius: var(--border-radius-md);
      padding: 4rem 2rem;

      @media (width <= 850px) {
        height: 70rem;
      }
    `}

  ${(props) =>
    props.type === "ring" &&
    css`
      height: 30rem;
    `}
`;

function ChartBox({ children, type }) {
  return <StyledChartBox type={type}>{children}</StyledChartBox>;
}

export default ChartBox;
