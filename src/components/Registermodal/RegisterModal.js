import React from "react";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, handleSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      avatar: avatar,
      name: name,
      email: email,
      password: password,
    };
    handleSignUp(user);
    console.log(user);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <div className="modal_labels">
        <label className="modal_label">
          Email
          <input
            className="modal_input"
            placeholder="Email"
            type="text"
            name="email"
            minLength="1"
            maxLength="30"
            value={name}
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal_label">
          password
          <input
            className="modal_input"
            placeholder="password"
            type="url"
            name="password"
            minLength="1"
            onChange={handlePasswordChange}
          />
        </label>
        <label className="modal_label">
          name
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
          Avatar URL
          <input
            className="modal_input"
            placeholder="Avatar URL"
            type="url"
            name="avatar URL"
            minLength="1"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
