import { useState } from "react";
import "./GetPet.css";
import usePet from "../hooks/usePet";

function GetPet() {
  const [celebrate, setCelebrate] = useState(false);
  const { pet } = usePet();

  if (!pet) return null;

  return (
    <div className="getpet-wrapper">
      <div className={`getpet-character ${celebrate ? "is-celebrating" : ""}`}>
        <img
          className="getpet-image"
          src={`/pets/${pet.type}/${pet.stage}.png`}
          alt="pet"
        />
      </div>
    </div>
  );
}

export default GetPet;