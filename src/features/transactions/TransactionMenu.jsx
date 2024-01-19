import styled from "styled-components";
import { HiDocumentDuplicate } from "react-icons/hi2";
import EditTransaction from "./EditTransaction";
import { FaTrash } from "react-icons/fa";
import DetailsTransaction from "./DetailsTransaction";
import { useDuplicateTransaction } from "./useDuplicateTransaction";
import { useDeleteTransaction } from "./useDeleteTransaction";

const StyledTransactionMenu = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  div {
    font-size: 1.8rem;
    padding: 0.5rem;
    line-height: 0;
    border-radius: 5px;
    background-color: var(--color-grey-100);
    border: none;
    transition: all 0.3s;

    &:hover {
      background-color: var(--color-brand-700);
      color: white;
    }
  }
`;

const TransactionMenu = ({ transaction }) => {
  const { duplicateTransaction } = useDuplicateTransaction();
  const { deleteTransaction } = useDeleteTransaction();

  return (
    <StyledTransactionMenu>
      <>
        <EditTransaction transaction={transaction}></EditTransaction>
      </>
      <div onClick={() => duplicateTransaction(transaction)}>
        <HiDocumentDuplicate />
      </div>
      <div onClick={() => deleteTransaction(transaction.id)}>
        <FaTrash />
      </div>
      <>
        <DetailsTransaction transaction={transaction}></DetailsTransaction>
      </>
    </StyledTransactionMenu>
  );
};

export default TransactionMenu;
