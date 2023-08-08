import React, { useContext } from "react";
import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const Header = ({
  onCreateModal,
  onRegisterModal,
  onLogInModal,
  isLoggedIn,
  name,
  avatar,
}) => {
  const currentUser = useContext(CurrentUserContext);
  // if (!parseWeatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header_logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        <div className="header_date">{currentDate}, Philadelphia</div>
      </div>
      {!isLoggedIn && (
        <div className="header_avatar-logo">
          <ToggleSwitch />

          <div>
            <button
              className="header_button"
              type="text"
              onClick={onRegisterModal}>
              Sign Up
            </button>
          </div>

          <div>
            <button
              className="header_button"
              type="text"
              onClick={onLogInModal}>
              Log In
            </button>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="header_avatar-logo">
          <ToggleSwitch />

          <div>
            <button
              className="header_button"
              type="text"
              onClick={onCreateModal}>
              +Add New Clothes
            </button>
          </div>
          <Link to="/profile" className="header_link">
            <p className="header_name">
              {currentUser ? currentUser.name : "olumide falade"}
            </p>
          </Link>
          <Link to="/profile" className="header_link">
            <img
              className="header_avatar"
              src={currentUser ? currentUser.avatar : ""}
              alt="avatar"
            />
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
