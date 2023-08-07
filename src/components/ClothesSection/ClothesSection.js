import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const ClothesSection = ({
  cards,
  onCreateModal,
  onSelectedCard,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const cardUser = cards.filter((card) => card.owner === currentUser._id);
  return (
    <div className="clothes">
      <div className="clothe_subcontainer">
        <div className="clothes_title">Your items</div>
        <button
          className="clothes_button"
          type="button"
          onClick={onCreateModal}>
          +Add new
        </button>
      </div>
      <ul className="clothes_card-container">
        {cardUser.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            onSelectedCard={onSelectedCard}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
