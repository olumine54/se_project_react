import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const ClothesSection = ({ cards, onCreateModal, onSelectCard }) => {
  const cardUser = cards.filter((card) => card.owner === currentUser._id);
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes">
      <div className="clothes_title">Your items</div>
      <button className="clothes_button" type="button" onClick={onCreateModal}>
        +Add new
      </button>

      <ul className="clothes_card-container">
        {cardUser.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={onSelectCard}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
