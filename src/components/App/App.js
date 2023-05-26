import "../App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temper = parseWeatherData(data);
        setTemp(temper);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          onClose={handleCloseModal}>
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
                value="hot"
                name="weather"
              />
              <label>Hot</label>
            </div>
            <div className="modal_button">
              <input
                className="modal_button-input"
                type="radio"
                id="warm"
                value="warm"
                name="weather"
              />
              <label>Warm</label>
            </div>
            <div className="modal_button">
              <input
                className="modal_button-input"
                type="radio"
                id="cold"
                value="cold"
                name="weather"
              />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
