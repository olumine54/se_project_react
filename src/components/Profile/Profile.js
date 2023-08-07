import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import React, { useContext } from "react";
import "../ItemCard/ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const Profile = ({
  items,
  onSelectedCard,
  onCreateModal,
  handleOpenEditModal,
  onCardLike,
  isLoggedIn,
  logOut,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <div className="profile_section">
        <SideBar
          handleOpenEditModal={handleOpenEditModal}
          logOut={logOut}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="profile_clothes">
        <ClothesSection
          cards={items}
          onCreateModal={onCreateModal}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
          onSelectedCard={onSelectedCard}
        />
      </div>
    </div>
  );
};
export default Profile;
