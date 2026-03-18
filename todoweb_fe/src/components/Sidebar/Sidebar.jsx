import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaBars, FaTachometerAlt, FaCheckCircle, FaPaw, FaUser, FaDoorOpen } from "react-icons/fa";

import "./Sidebar.css";

export const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
      </button>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>
            <FaPaw style={{ color: "#a78bfa" }} /> PetTodo
          </h2>
        </div>

        <div className="sidebar-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <FaTachometerAlt style={{ marginRight: 8 }} /> Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <FaCheckCircle style={{ marginRight: 8 }} /> Tasks
          </NavLink>

          <NavLink
            to="/pet"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <FaPaw style={{ marginRight: 8 }} /> My Pet
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <FaUser style={{ marginRight: 8 }} /> Profile
          </NavLink>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <FaDoorOpen style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};