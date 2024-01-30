import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useWallets } from "../features/wallets/useWallets";
import { FaPlus } from "react-icons/fa";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import WalletCard from "../features/wallets/WalletCard";
import CreateWallet from "../features/wallets/CreateWallet";

const WalletsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
`;

function Wallets() {
  const { isLoading, wallets } = useWallets();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Wallets</Heading>
      </Row>
      <Row>
        <WalletsContainer>
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet}></WalletCard>
          ))}
          <CreateWallet></CreateWallet>
        </WalletsContainer>
      </Row>
    </>
  );
}

export default Wallets;
