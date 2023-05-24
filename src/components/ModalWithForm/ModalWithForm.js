import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "AddGarment",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal_content">
        <img
          src={require("../../images/Itemclose.svg").default}
          class="modal_close-button"
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
