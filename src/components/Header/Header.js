import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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

      <div className="header_avatar-logo">
        <ToggleSwitch />
        <div>
          <button className="header_button" type="text" onClick={onCreateModal}>
            +Add New Clothes
          </button>
        </div>
        <NavLink to="/profile" className="header_name">
          Olumide Falade
        </NavLink>
        <div>
          <img src={avatarImage} alt="avatar" />
        </div>
      </div>
    </header>
  );
};
export default Header;
