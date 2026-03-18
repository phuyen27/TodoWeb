import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import toast from "react-hot-toast";
import Pet from "../components/ui/PetAnimation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "./auth.css";

export default function RegisterPage() {

  const navigate = useNavigate();
  const { register } = useAuth(); 

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    //  VALIDATE
    // =========================
    if (!username.trim()) {
      return toast.error("Username is required");
    }

    if (username.length < 2) {
      return toast.error("Username must be at least 2 characters");
    }

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Invalid email format");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Registering...");

    try {
      
      await register(username, email, password, confirmPassword);

      toast.success("Register successful!", { id: toastId });

      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Register failed!",
        { id: toastId }
      );
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

       
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p className="auth-text">
          Already have an account?{" "}
          <a href="/login" className="auth-link">Login</a>
        </p>

        <Button type="submit">Register</Button>

      </form>
    </div>
  );
}