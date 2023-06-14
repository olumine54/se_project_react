import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");
  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //   if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  // };
  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="switch_label">
      <input
        className="switch_input"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch_slider switch_slider-F"
            : "switch_slider switch_slider-C"
        }></span>
      <p
        className={`switch_temp-F ${
          currentTemperatureUnit === "F" && "switch_active"
        }`}>
        F
      </p>
      <p
        className={`switch_temp-C ${
          currentTemperatureUnit === "C" && "switch_active"
        }`}>
        C
      </p>
    </label>
  );
};
export default ToggleSwitch;
