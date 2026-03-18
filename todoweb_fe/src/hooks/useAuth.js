import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      if (!res.data.token) {
        throw new Error(res.data.message || "Invalid credentials");
      }

      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
      setToken(jwt);

      return jwt;
    } catch (err) {
     
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}