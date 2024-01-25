import styled from "styled-components";
import Modal from "../../ui/Modal";
import { FaPlus } from "react-icons/fa";
import CreateWalletForm from "./CreateWalletForm";

const NewWallet = styled.div`
  min-width: 30rem;
  min-height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--color-grey-300);
  padding: 2rem 3rem;
  background-color: var(--color-grey-100);
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

function CreateWallet({}) {
  return (
    <Modal>
      <Modal.Open opens="create-wallet">
        <NewWallet>
          <div>New Wallet</div>
          <FaPlus />
        </NewWallet>
      </Modal.Open>
      <Modal.Window name="create-wallet">
        <CreateWalletForm />
      </Modal.Window>
    </Modal>
  );
}

export default CreateWallet;
