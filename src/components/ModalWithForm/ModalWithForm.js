import "./ModalWithForm.css";
import itemcloseImage from "../../images/Itemclose.svg";

const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal_content">
        <img
          src={itemcloseImage}
          className="modal_close-button"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal_title">{title}</h3>
        <form className="form">{children}</form>
        <button type="submit" className="modal_button-submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;
