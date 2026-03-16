import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Pet from "../components/ui/PetAnimation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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

      toast.success("Login successful", { id: toastId });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login failed",
        { id: toastId }
      );

    }
  };

  return (

    <div className="flex items-center flex-wrap justify-center h-screen bg-gray-100">
      <Pet />

      <form
        onSubmit={handleSubmit}
        className="bg-white m-6 p-6 rounded-xl shadow w-80"
      >

        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

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

        <p className="p-2">
          Don't have an account yet?{" "}
          <a href="/register" className="text-primary-500 hover:underline">
            Register
          </a>
        </p>

        <Button type="submit">
          Login
        </Button>

      </form>

    </div>
  );
}