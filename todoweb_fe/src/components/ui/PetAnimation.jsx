import { useState } from "react";
function PetAnimation() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full animate-bounce">
        <img
          src="/pets/cat/baby.png"
          alt="pet"
          className="w-full select-none"
        />
      </div>
    </div>
  );
}

export default PetAnimation;