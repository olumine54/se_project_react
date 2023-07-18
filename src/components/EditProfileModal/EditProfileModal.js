import React from "react";
import { useState } from "react";

const EditProfileModal = ({ currentUser, onClose }) => {
  const [name, setName] = useState(currentUser.name);
  const [avatarURL, setAvatarURL] = useState(currentUser.avatar);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarURLChange = (event) => {
    setAvatarURL(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ModalWithForm
      buttonText="Save change"
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
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
            onChange={handleAvatarURLChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};
export { EditProfileModal };
