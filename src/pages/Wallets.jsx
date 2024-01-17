import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlus, FaWallet } from "react-icons/fa";

const WalletsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7rem;
`;

const Wallet = styled.div`
  position: relative;
  display: grid;
  min-width: 20rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--color-brand-700);
  padding: 2rem 3rem;
  background-color: var(--color-grey-200);
  gap: 1rem;
  row-gap: 2rem;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const WalletIcon = styled.div`
  font-size: 5rem;
  display: flex;
  color: var(--color-brand-700);
`;
const WalletAmount = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;
const AccountName = styled.p`
  font-weight: 400;
  font-size: 3rem;
`;
const Arrow = styled.div`
  font-size: 2.4rem;
  position: absolute;
  right: 0;
  justify-self: end;
  align-self: flex-end;
  width: min-content;
  height: min-content;
  margin: 1rem;
  line-height: 0;
  padding: 0.6rem;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-300);
  }

  &:active {
    background-color: var(--color-grey-200);
  }
`;

const NewWallet = styled.div`
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--color-grey-300);
  padding: 2rem 3rem;
  background-color: var(--color-grey-200);
  gap: 1rem;
  border-radius: 10px;
  font-size: 2.7rem;
  white-space: nowrap;
  font-weight: 500;
  line-height: 1;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-300);
    color: white;
  }
`;

function Wallets() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Wallets</Heading>
      </Row>
      <Row>
        <WalletsContainer>
          <Wallet>
            <WalletIcon>
              <FaWallet />
            </WalletIcon>
            <AccountName>ING</AccountName>
            <WalletAmount>500$</WalletAmount>
            <Arrow>
              <FaArrowRight />
            </Arrow>
          </Wallet>
          <NewWallet>
            <div>New Wallet</div>
            <FaPlus />
          </NewWallet>
        </WalletsContainer>
      </Row>
    </>
  );
}

export default Wallets;
