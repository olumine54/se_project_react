import React from "react";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, handleCloseModal, handleSignIn }) => {
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
    handleCloseModal();
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
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <div className="modal_labels">
        <label className="modal_label">
          Email
          <input
            className="modal_input"
            placeholder="Name"
            type="email"
            name="email"
            minLength="1"
            maxLength="3000"
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className="modal_label">
          password
          <input
            className="modal_input"
            placeholder="password"
            type="password"
            name="password"
            minLength="1"
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
      <Link to="/signup" className="modal__link">
        or Register
      </Link>
    </ModalWithForm>
  );
};
export default LoginModal;
