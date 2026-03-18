import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import Pet from "../components/ui/PetAnimation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "./auth.css"; 

export default function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      await login(email, password);

      let hasPet = true;
      try {
        const res = await api.get("/pet");
        hasPet = !!res.data;
      } catch {
        hasPet = false;
      }

      toast.success("Login successful", { id: toastId });
      navigate(hasPet ? "/" : "/pet");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="auth-page">
      <Pet />

      <form onSubmit={handleSubmit} className="auth-card">

        <h1 className="auth-title">LOGIN</h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="auth-text">
          Don't have an account yet?{" "}
          <a href="/register" className="auth-link">Register</a>
        </p>

        <Button type="submit">Start Game</Button>

      </form>
    </div>
  );
}