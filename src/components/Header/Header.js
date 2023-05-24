import "./Header.css";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header_logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="logo" />
        </div>
        <div className="header_date">May, 23, Philadelphia</div>
      </div>
      <div className="header_avatar-logo">
        <div>
          <button className="header_button" type="text" onClick={onCreateModal}>
            +Add New Clothes
          </button>
        </div>
        <div className="header_name">Olumide Falade</div>
        <div>
          <img src={require("../../images/avatar.svg").default} alt="avatar" />
        </div>
      </div>
    </header>
  );
};
export default Header;
