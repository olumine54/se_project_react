import "./ItemModal.css";
import itemcloseImage from "../../images/Itemclose.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, handleDeleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteButtonClassName = `item_button-delete ${
    isOwn ? "item_delete-button_visible" : "item_delete-button_hidden"
  }`;

  return (
    <div className="item_modal">
      <div className="item_modal-content">
        <button
          className="item_close-button"
          id="Item-modal-button"
          type="button"
          onClick={onClose}>
          <img src={itemcloseImage} alt="item close" />
        </button>
        <img
          src={selectedCard?.link || selectedCard?.imageUrl}
          className="item_modal-image"
          alt={selectedCard.name}
        />
        <div className="item_modal-name">{selectedCard.name}</div>
        <div className="item_modal-weather">
          weather type: {selectedCard.weather}
        </div>
        <button
          className={itemDeleteButtonClassName}
          onClick={handleDeleteItem}>
          Delete item
        </button>
      </div>
    </div>
  );
};
export default ItemModal;
