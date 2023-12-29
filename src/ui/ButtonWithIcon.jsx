import styled from "styled-components";

const StyledButtonWithIcon = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  transition: all 0.5s;

  &:hover {
    span {
      background-color: var(--color-brand-50);
      color: var(--color-brand-800);
    }
  }

  span {
    font-size: 2.7rem;
    border-radius: 3px;
    padding: 0.2rem;
    background-color: var(--color-brand-700);
    transition: all 0.5s;
  }
`;

function ButtonWithIcon({ icon, children, onClick }) {
  return (
    <StyledButtonWithIcon onClick={onClick}>
      <span>{icon}</span>
      {children}
    </StyledButtonWithIcon>
  );
}

export default ButtonWithIcon;
