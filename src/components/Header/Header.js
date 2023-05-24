import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header_logo">
        <div>
          <img src={logoImage} alt="logo" />
        </div>
        <div className="header_date">{currentDate}, Philadelphia</div>
      </div>
      <div className="header_avatar-logo">
        <div>
          <button className="header_button" type="text" onClick={onCreateModal}>
            +Add New Clothes
          </button>
        </div>
        <div className="header_name">Olumide Falade</div>
        <div>
          <img src={avatarImage} alt="avatar" />
        </div>
      </div>
    </header>
  );
};
export default Header;
