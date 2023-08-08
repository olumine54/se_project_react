import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import likes from "../../images/likes.svg";
import likeActive from "../../images/likeActive.svg";

const ItemCard = ({ item, onSelectedCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((userId) => userId === currentUser?._id);

  const handleLike = () => {
    onCardLike(item?._id, isLiked);
  };

  const onClick = () => {
    onSelectedCard(item);
  };

  return (
    <div className="card">
      <div className="card_container">
        <p className="card_name">{item && item.name}</p>
        <img
          src={item?.link || item?.imageUrl}
          alt={item?.name}
          className="card_image"
          onClick={onClick}
        />

        {isLoggedIn ? (
          <img
            src={!isLiked ? likes : likeActive}
            alt="like button"
            className={isLiked ? "card_like-button" : "card_unlike-button"}
            onClick={handleLike}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ItemCard;
