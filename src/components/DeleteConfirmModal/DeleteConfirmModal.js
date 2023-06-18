import "../ModalWithForm/ModalWithForm.css";
import itemcloseImage from "../../images/Itemclose.svg";

const DeleteConfirmModal = ({
  handleCloseConfirmModal,
  handleDeleteItem,
  selectedCard,
}) => {
  const handleCancel = () => {
    handleCloseConfirmModal();
  };
  return (
    <div className="modal">
      <div className="modal_confirm-content">
        <div>Are you sure you want to delete this item?</div>
        <div>This action is irreversible.</div>
        <button
          className="modal_confirm-close"
          onClick={handleCloseConfirmModal}>
          <img src={itemcloseImage} alt="close-button" />
        </button>
        <div className="modal_buttons-confirm">
          <button
            className="modal_button-confirm"
            type="button"
            onClick={() => handleDeleteItem(selectedCard.id)}>
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
