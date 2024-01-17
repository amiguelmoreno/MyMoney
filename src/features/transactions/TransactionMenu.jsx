import styled from "styled-components";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import DropDownOption from "./DropDownOption";

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

const TransactionMenu = ({ transaction }) => {
  return (
    <StyledTransactionMenu>
      <Modal>
        <Modal.Open opens="details-transaction">
          <button>
            <HiAdjustmentsVertical />
          </button>
        </Modal.Open>
        <Modal.Window name="details-transaction">
          <DropDownOption transaction={transaction}></DropDownOption>
        </Modal.Window>
      </Modal>
    </StyledTransactionMenu>
  );
};

export default TransactionMenu;
