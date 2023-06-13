import "../ModalWithForm.css";
import itemcloseImage from "../../images/Itemclose.svg";

const DeleteConfirm = () => {
  return (
    <div className="modal">
      <div className="modal__confirm-content">
        <div>Are you sure you want to delete this item?</div>
        <div> This action is irreversible.</div>
        <button className="modal__confirm-close">
          <img src={itemcloseImage} alt="close-button" />
        </button>
        <div className="modal__buttons-confirm">
          <button className="modal__button-confirm" type="button">
            Yes, delete item
          </button>
          <button className="modal__button-cancel" type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { DeleteConfirm };
