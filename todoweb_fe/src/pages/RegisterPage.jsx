import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import Pet from "../components/ui/PetAnimation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/auth/register", {
        username,
        email,
        password
      });

      toast.success("Register successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Register failed!"
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
          Register
        </h1>

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

        <p className="p-2">
          Already have an account?{" "}
          <a href="/login" className="text-primary-500 hover:underline">
            Login
          </a>
        </p>

        <Button type="submit">
          Register
        </Button>

      </form>
    </div>
  );
}