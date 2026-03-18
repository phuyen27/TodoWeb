import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import Pet from "../components/ui/PetAnimation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "./auth.css"; // dùng chung với LoginPage

export default function RegisterPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      toast.success("Register successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed!");
    }
  };

  return (
    <div className="auth-page">
      <Pet />

      <form onSubmit={handleSubmit} className="auth-card">

        <h1 className="auth-title">REGISTER</h1>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          Already have an account?{" "}
          <a href="/login" className="auth-link">Login</a>
        </p>

        <Button type="submit">Start Game</Button>

      </form>
    </div>
  );
}