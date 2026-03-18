import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD TOKEN + USER
  // =========================
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);

        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch {
          logout();
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  // =========================
  //  LOGIN
  // =========================
  const login = async (email, password) => {

    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const res = await api.post("/auth/login", { email, password });

    const jwt = res.data;

    localStorage.setItem("token", jwt);
    setToken(jwt);

    // load user sau login
    const userRes = await api.get("/auth/me");
    setUser(userRes.data);

    return jwt;
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password, confirmPassword) => {

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const res = await api.post("/auth/register", {
      username: name, 
      email,
      password
    });

    return res.data;
  };

  // =========================
  //  GET ME
  // =========================
  const getMe = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
    return res.data;
  };

  // =========================
  //  UPDATE PROFILE
  // =========================
  const updateProfile = async (username, password) => {

    if (!username || username.length < 2) {
      throw new Error("Username too short");
    }

    if (password && password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const res = await api.patch("/auth/me", {
      username,
      password: password || null
    });

    setUser(res.data);

    return res.data;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,              
        login,
        register,
        logout,
        getMe,             
        updateProfile,     
        isAuthenticated,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}