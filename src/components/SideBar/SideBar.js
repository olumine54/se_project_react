import React, { useContext } from "react";
// import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const SideBar = ({ isLoggedIn, handleOpenEditModal, logOut }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar_profile">
      {isLoggedIn && currentUser && (
        <div className="sidebar_info">
          {currentUser.avatar ? (
            <img
              className="sidebar_avatar"
              src={currentUser.avatar}
              alt="User avatar"
            />
          ) : (
            <p className="sidebar_note">{currentUser.name[0]}</p>
          )}
          <p className="sidebar_name">{currentUser.name}</p>
        </div>
      )}
      <button
        className="sidebar_edit sidebar_button"
        onClick={handleOpenEditModal}>
        Change profile data
      </button>
      <button className="sidebar_logout sidebar_button" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};
export default SideBar;
