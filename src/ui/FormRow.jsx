import styled from "styled-components";

const StyledFormRow = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.8fr;
  gap: 4.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    margin-top: 2rem;
    padding-bottom: 0;
  }

  /*  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  position: absolute;
  border-radius: 3px;
  padding: 0 1rem;
  right: 0;
  bottom: -1.2rem;
  background-color: var(--color-red-700);
  font-size: 1.4rem;
  color: var(--color-grey-0);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
