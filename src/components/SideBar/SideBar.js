import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img src={avatarImage} alt="avatar" className="sidebar_avatar" />
      <div className="sidebar_name">Olumide Falade</div>
    </div>
  );
};
export { SideBar };
