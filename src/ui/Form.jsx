import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.3rem;

  @media (width <= 850px) {
    font-size: 1.1rem;

    input,
    select,
    textarea {
      width: 100%;
    }

    button {
      font-size: 1.1rem;
    }
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2rem;

      /* Box */
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
