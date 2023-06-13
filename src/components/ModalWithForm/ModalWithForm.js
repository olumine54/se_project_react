import React from "react";
import "./ModalWithForm.css";
import itemcloseImage from "../../images/Itemclose.svg";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  onSubmit,
  isOpen,
}) => {
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
        <form className="form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal_button-submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
