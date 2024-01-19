import Details from "../../ui/Details";
import Modal from "../../ui/Modal";
import { FaEye } from "react-icons/fa";

function DetailsTransaction({ transaction }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="details-transaction">
          <div>
            <FaEye />
          </div>
        </Modal.Open>
        <Modal.Window name="details-transaction">
          <Details transaction={transaction} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default DetailsTransaction;
