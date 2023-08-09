import "../ModalWithForm/ModalWithForm.css";
import itemcloseImage from "../../images/Itemclose.svg";
import { useEscape } from "../../hook/useEscape";

const DeleteConfirmModal = ({
  handleCloseModal,
  handleDeleteItem,
  selectedCard,
}) => {
  const handleCancel = () => {
    handleCloseModal();
  };
  useEscape(handleCloseModal);
  return (
    <div className="modal">
      <div className="modal_confirm-content">
        <div>Are you sure you want to delete this item?</div>
        <div>This action is irreversible.</div>
        <button className="modal_confirm-close" onClick={handleCloseModal}>
          <img src={itemcloseImage} alt="close-button" />
        </button>
        <div className="modal_buttons-confirm">
          <button
            className="modal_button-confirm"
            type="button"
            onClick={() => handleDeleteItem(selectedCard._id)}>
            Yes, delete item
          </button>
          <button
            className="modal_button-cancel"
            type="button"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { DeleteConfirmModal };
