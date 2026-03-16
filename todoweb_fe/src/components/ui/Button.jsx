import React from "react";

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary-500 cursor-pointer hover:bg-primary-600 text-white w-full p-2 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;