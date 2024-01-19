import Modal from "../../ui/Modal";
import CreateTransactionForm from "./CreateTransactionForm";
import { FaPencilAlt } from "react-icons/fa";

function EditTransaction({ transaction }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="edit-transaction">
          <div>
            <FaPencilAlt />
          </div>
        </Modal.Open>
        <Modal.Window name="edit-transaction">
          <CreateTransactionForm type="edit" transaction={transaction} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default EditTransaction;
