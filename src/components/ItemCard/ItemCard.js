import "./ItemCard.css";

const ItemCard = ({ item, onSelectedCard }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };
  return (
    <div className="card_container">
      <img
        src={item?.link || item?.imageUrl}
        alt={item?.name}
        className="card_image"
        onClick={handleCardClick}
      />

      <div className="card_name">{item && item.name}</div>
    </div>
  );
};

export default ItemCard;
