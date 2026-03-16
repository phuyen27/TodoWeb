import React from "react";

const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 w-full p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
    />
  );
};

export default Input;