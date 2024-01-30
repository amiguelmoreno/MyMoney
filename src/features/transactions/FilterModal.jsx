import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import TransactionsTableOperations from "./TransactionsTableOperations";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useState } from "react";

const StyledModal = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  border: none;
  padding: 1rem;
  background-color: var(--color-grey-600);
  color: var(--color-grey-0);
  font-size: 2.5rem;
  line-height: 0;
  border-radius: 5px;
`;

function FilterModal() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useOutsideClick(() => setIsDropdownVisible(false));

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  //onsole.log(isDropdownVisible);

  return (
    <StyledModal ref={ref}>
      <StyledButton onClick={toggleDropdown}>
        <FaFilter />
      </StyledButton>

      <TransactionsTableOperations
        isVisible={isDropdownVisible}
      ></TransactionsTableOperations>
    </StyledModal>
  );
}

export default FilterModal;
