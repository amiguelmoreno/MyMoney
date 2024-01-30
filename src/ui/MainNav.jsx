import styled from "styled-components";
import {
  HiMiniSquares2X2,
  HiArrowsRightLeft,
  HiMiniWallet,
  HiAdjustmentsVertical,
} from "react-icons/hi2";
import { GrSettingsOption } from "react-icons/gr";

import { NavLink } from "react-router-dom";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (width <= 1050px) {
    flex-direction: row;
    align-items: center;

    li {
      display: flex;
      flex-direction: column;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 3.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  @media (width <= 1050px) {
    display: flex;
    flex-direction: column;

    &:link,
    &:visited {
      padding: 1rem 2rem;
    }
  }

  @media (width <= 600px) {
    span {
      display: none;
    }
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiMiniSquares2X2 />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/transactions">
            <HiArrowsRightLeft />
            <span>Transactions</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/wallets">
            <HiMiniWallet />
            <span>Wallets</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
