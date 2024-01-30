import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import AddTransaction from "../features/transactions/AddTransaction";
import DarkModeButton from "../features/settings/DarkModeButton";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  @media (width <= 1050px) {
    position: fixed;
    align-items: center;
    justify-content: space-between;
    width: 100dvw;
    flex-direction: row;
    bottom: 0;
    padding: 1rem 3rem;
    z-index: 999;
  }

  @media (width <= 850px) {
    justify-content: center;
  }

  @media (width <= 600px) {
    justify-content: end;
    gap: 3rem;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo></Logo>
      <MainNav></MainNav>
      <AddTransaction></AddTransaction>
      <DarkModeButton></DarkModeButton>
    </StyledSidebar>
  );
}

export default Sidebar;
