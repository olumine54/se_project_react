import "./ItemModal.css";
import itemcloseImage from "../../images/Itemclose.svg";

const ItemModal = ({ selectedCard, onClose, handleOpenConfirmModal }) => {
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
        <button className="item_button-delete" onClick={handleOpenConfirmModal}>
          Delete item
        </button>
      </div>
    </div>
  );
};
export default ItemModal;
