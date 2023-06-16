import "./ItemCard.css";

const ItemCard = ({ item, onSelectedCard }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };
  return (
    <div className="card_container">
      {item && item.link && (
        <img
          src={item.link}
          alt={item.name}
          className="card_image"
          onClick={handleCardClick}
        />
      )}
      <div className="card_name">{item && item.name}</div>
    </div>
  );
};

export default ItemCard;
