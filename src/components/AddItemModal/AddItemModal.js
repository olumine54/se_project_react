import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const [weatherType, setWeatherType] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onsubmit={handleSubmit}>
      <div className="modal_labels">
        <label className="modal_label">
          name
          <input
            className="modal_input"
            placeholder="Name"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal_label">
          image
          <input
            className="modal_input"
            placeholder="Image URL"
            type="url"
            name="link"
            minLength="1"
            maxLength="30"
            value={link}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <p className="modal_text">Select the weather type:</p>
      <div className="modal_buttons">
        <div className="modal_button">
          <input
            className="modal_button-input"
            type="radio"
            id="hot"
            name="weather"
            value={weatherType}
            onChange={handleWeatherChange}
          />
          <label>Hot</label>
        </div>
        <div className="modal_button">
          <input
            className="modal_button-input"
            type="radio"
            id="warm"
            name="weather"
            value={weatherType}
            onChange={handleWeatherChange}
          />
          <label>Warm</label>
        </div>
        <div className="modal_button">
          <input
            className="modal_button-input"
            type="radio"
            id="cold"
            name="weather"
            value={weatherType}
            onChange={handleWeatherChange}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};
export { AddItemModal };
