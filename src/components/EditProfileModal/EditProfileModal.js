import React from "react";
import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const EditProfileModal = ({ onClose, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarURLChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save change"
      title="Change profile data"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit">
      <div className="modal_labels">
        <label className="modal_label">
          Name
          <input
            className="modal_input"
            placeholder="Name"
            type="text"
            name="name"
            minLength="1"
            maxLength="3000"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal_label">
          Avatar
          <input
            className="modal_input"
            placeholder="avatar"
            type="url"
            name="link"
            minLength="1"
            value={avatar}
            onChange={handleAvatarURLChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};
export { EditProfileModal };
