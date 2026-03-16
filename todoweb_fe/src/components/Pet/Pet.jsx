import { useState } from "react";
import "./Pet.css";

function Pet() {
  const [celebrate, setCelebrate] = useState(false);

  const handleCheckin = () => {
    setCelebrate(true);

    setTimeout(() => {
      setCelebrate(false);
    }, 1500);
  };

  return (
    <>  
      <div className="pet-wrapper">
        <div className={`pet ${celebrate ? "celebrate" : ""}`}>
          <img src="/pets/cat/baby.png" alt="pet"/>
        </div>
      </div>

      <button onClick={handleCheckin}>
        Check in streak
      </button>
    </>
  );
}

export default Pet;