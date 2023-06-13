import "./Profile.css";
import { SideBar } from "../SideBar/SideBar";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import ItemCard from "../ItemCard/ItemCard";

const Profile = ({ items, onSelectedCard, onCreateModal }) => {
  return (
    <div className="profile">
      <div className="profile__section">
        <SideBar />
      </div>
      <div className="profile__clothes">
        <ClothesSection cards={items} onCreateModal={onCreateModal} />
        <section className="cards">
          <ul className="cards__list">
            {items.map((card) => (
              <ItemCard
                key={card._id}
                item={card}
                name={card.name}
                onSelectedCard={onSelectedCard}
                id={card.id}
                weather={card.weather}
                link={card.link}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
export { Profile };
