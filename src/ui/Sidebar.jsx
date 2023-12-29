import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import AddTransaction from "../features/transactions/AddTransaction";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 5.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo></Logo>
      <MainNav></MainNav>
      <AddTransaction></AddTransaction>
    </StyledSidebar>
  );
}

export default Sidebar;
