import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

const Header = ({
  onCreateModal,
  onRegisterModal,
  onLogInModal,
  isLoggedIn,
  name,
  avatar,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  //const { name, avatar } = currentUser;

  return (
    <header className="header">
      <div className="header_logo">
        <div>
          <NavLink to="/">
            <img src={logoImage} alt="logo" />
          </NavLink>
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
          <NavLink to="/profile" className="header_name">
            Olumide Falade
          </NavLink>
          <div>
            {avatar ? (
              <img src={avatarImage} alt="avatar" />
            ) : (
              <div className="header_placeholder">
                {name ? name.charAt(0).toUpperCase() : ""}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
