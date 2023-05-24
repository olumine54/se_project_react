import "./ItemModal.css";
const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={"item_modal"}>
      <div className="item_modal-content">
        <img
          src={require("../../images/Itemclose.svg").default}
          className="Item_modal-button"
          type="button"
          onClick={onClose}
        />

        <img
          src={selectedCard.link}
          className="item_modal-image"
          alt={selectedCard.name}
        />
        <div className="item_modal-name">{selectedCard.name}</div>
        <div className="item_modal-weather">
          weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};
export default ItemModal;