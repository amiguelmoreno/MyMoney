import { HiMiniPlus } from "react-icons/hi2";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import Modal from "../../ui/Modal";
import CreateTransactionForm from "./CreateTransactionForm";

function AddTransaction() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <ButtonWithIcon icon={<HiMiniPlus />}>New transaction</ButtonWithIcon>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateTransactionForm type="create" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTransaction;
