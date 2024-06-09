import { Modal, Spinner } from "react-bootstrap";
import trash from "../../../assets/icons/trash.svg";

export default function DeletePrompt({
  showState,
  setShowState,
  itemToDelete,
  handleDelete,
  isLoading, 
}) {
  return (
    <div className="add-subject-container ">
      <Modal
        show={showState}
        onHide={() => setShowState()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add-subject-header" closeButton>
          Heads Up!
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <center>
            <figure>
              <img src={trash} alt={`Delete ${itemToDelete}`} />
            </figure>
            <header>
              Are you sure you want to delete this {itemToDelete}?{" "}
            </header>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons">
            <button
              onClick={() => {
                setShowState();
              }}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                handleDelete();
              }}
            >
              {isLoading ? <Spinner size="sm" variant="white" /> : "Delete"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
