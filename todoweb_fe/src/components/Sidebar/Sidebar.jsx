import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = ({ onLogout }) => {

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>🌸 PetTodo</h2>
      </div>

      <div className="sidebar-menu">

        <NavLink
          to="/"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          ✅ Tasks
        </NavLink>

        <NavLink
          to="/pet"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          🐾 My Pet
        </NavLink>

        <NavLink
          to="/profile"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          👤 Profile
        </NavLink>

      </div>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );

};