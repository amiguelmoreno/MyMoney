import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import styled from "styled-components";
import { useDeleteTransaction } from "./useDeleteTransaction";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { useDuplicateTransaction } from "./useDuplicateTransaction";
import EditTransaction from "./EditTransaction";
import DetailsTransaction from "./DetailsTransaction";

const StyledTransactionMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 0.4rem;
    font-size: 2.1rem;
    border-radius: 5px;
    background-color: var(--color-grey-100);
    border: none;
  }
`;

const StyledMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: -1rem;
  margin-top: 1rem;
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
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
  }
`;

const TransactionMenu = ({ transaction }) => {
  const { duplicateTransaction } = useDuplicateTransaction();
  const { deleteTransaction } = useDeleteTransaction();
  const [isOpen, setIsOpen] = useState(false);
  //const menuRef = useRef(null);

  /* useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]); */

  const handleOptionClick = (callback) => {
    setIsOpen(!isOpen);

    if (typeof callback === "function") {
      callback();
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <StyledTransactionMenu /* ref={menuRef} */>
      <button onClick={handleOptionClick}>
        <HiAdjustmentsVertical />
      </button>
      {isOpen && (
        <StyledMenuDropdown /* onClick={() => setIsOpen(!isOpen)} */>
          <ul>
            <li onClick={() => duplicateTransaction(transaction)}>
              <HiDocumentDuplicate />
              Duplicate
            </li>
            <>
              <EditTransaction transaction={transaction}></EditTransaction>
            </>

            <li
              onClick={() =>
                handleOptionClick(() => deleteTransaction(transaction.id))
              }
            >
              <FaTrash />
              Delete
            </li>
            <>
              <DetailsTransaction
                transaction={transaction}
              ></DetailsTransaction>
            </>
          </ul>
        </StyledMenuDropdown>
      )}
    </StyledTransactionMenu>
  );
};

export default TransactionMenu;
