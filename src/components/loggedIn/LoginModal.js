import React from "react";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    handleSignIn(user);
    console.log(user);
    onClose();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <div className="modal_labels">
        <label className="modal_label">
          Email
          <input
            className="modal_input"
            placeholder="Name"
            type="text"
            name="Email"
            minLength="1"
            maxLength="3000"
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal_label">
          password
          <input
            className="modal_input"
            placeholder="password"
            type="url"
            name="link"
            minLength="1"
            onChange={handlePasswordChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};
export default LoginModal;
