import styled from "styled-components";
import EditTransaction from "./EditTransaction";
import { HiDocumentDuplicate } from "react-icons/hi2";
import DetailsTransaction from "./DetailsTransaction";
import { FaTrash } from "react-icons/fa";
import { useDuplicateTransaction } from "./useDuplicateTransaction";
import { useDeleteTransaction } from "./useDeleteTransaction";

const StyledMenuDropdown = styled.ul`
  left: -1rem;
  margin-top: 1rem;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li,
  span {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    gap: 1.5rem;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: var(--color-grey-100);
    }

    &:active {
      background-color: var(--color-grey-200);
    }
  }
`;

function DropDownOption({ transaction, onCloseModal }) {
  const { duplicateTransaction } = useDuplicateTransaction();
  const { deleteTransaction } = useDeleteTransaction();

  const handleClick = (callback) => {
    if (typeof callback === "function") {
      callback();
    }

    onCloseModal();
  };
  return (
    <>
      <StyledMenuDropdown>
        <>
          <EditTransaction transaction={transaction}></EditTransaction>
        </>
        <li
          onClick={() => handleClick(() => duplicateTransaction(transaction))}
        >
          <HiDocumentDuplicate />
          Duplicate
        </li>
        <li
          onClick={() => handleClick(() => deleteTransaction(transaction.id))}
        >
          <FaTrash />
          Delete
        </li>
        <>
          <DetailsTransaction transaction={transaction}></DetailsTransaction>
        </>
      </StyledMenuDropdown>
    </>
  );
}

export default DropDownOption;
