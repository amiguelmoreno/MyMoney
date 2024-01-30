import { FaWallet } from "react-icons/fa6";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useGetTransactionsWallet } from "./useGetTransactionsWallet";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { usedeleteWalletAndTransactions } from "./useDeleteWallet";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Wallet = styled.div`
  position: relative;
  display: grid;
  min-width: 25rem;
  max-width: 25rem;
  min-height: 15rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--color-brand-700);
  padding: 1rem 2rem;
  background-color: var(--color-grey-100);
  gap: 1rem;
  border-radius: 10px;
  transition: all 0.3s;
`;

const WalletIcon = styled.div`
  font-size: 5rem;
  display: flex;
  color: var(--color-brand-700);
`;
const WalletAmount = styled.div`
  font-size: 2rem;
  grid-column: span 2;
  font-weight: 600;
`;
const AccountName = styled.p`
  font-weight: 400;
  font-size: 3rem;
`;
const Dots = styled.div`
  font-size: 2.8rem;
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

const DropdownMenu = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function WalletContainer({ wallet }) {
  const queryClient = useQueryClient();
  const { isLoading, transactionsFromWallet } = useGetTransactionsWallet(
    wallet.id
  );
  const { isDeleting, deleteWallet } = usedeleteWalletAndTransactions(
    wallet.id
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const ref = useOutsideClick(() => setIsDropdownVisible(false));

  function calcTotalAmount(wallet, transactions) {
    const totalAmount =
      wallet.initialAmount +
      (transactions
        ? transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount;
          }, 0)
        : 0);

    return formatCurrency(totalAmount);
  }

  useEffect(() => {
    if (!isDeleting) {
      // Si la eliminación ha tenido éxito, forzar la recarga de datos
      queryClient.invalidateQueries("wallets");
    }
  }, [isDeleting]);

  if (isLoading) return <Spinner></Spinner>;

  return (
    <Wallet>
      <WalletIcon>
        <FaWallet />
      </WalletIcon>
      <AccountName>{wallet.name}</AccountName>
      <WalletAmount>
        {calcTotalAmount(wallet, transactionsFromWallet)}
      </WalletAmount>
      <Dots onClick={toggleDropdown} ref={ref}>
        <HiDotsVertical />
      </Dots>
      {!isLoading && (
        <DropdownMenu visible={isDropdownVisible}>
          <DropdownItem onClick={() => deleteWallet(wallet?.id)}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      )}
    </Wallet>
  );
}

export default WalletContainer;
