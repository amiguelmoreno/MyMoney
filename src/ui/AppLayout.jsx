import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  height: 100dvh;

  @media (width <= 1050px) {
    display: flex;
  }
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 12rem;
  overflow: scroll;
  flex: 1;
`;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar></Sidebar>
      <StyledMain>
        <StyledContainer>
          <Outlet></Outlet>
        </StyledContainer>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
