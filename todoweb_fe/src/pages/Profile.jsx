import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "../components/Sidebar/Sidebar";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "./Proflie.css";

export default function Profile() {

  const { user, updateProfile, logout, loading } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (loading) {
    return <div className="profile">Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Updating...");

    try {
      await updateProfile(username, password);

      setPassword("");
      setConfirmPassword("");

      toast.success("Profile updated!", { id: toastId });

    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="profile">

      <Sidebar onLogout={logout} />

      <div className="profile-content">

        <form className="profile-card" onSubmit={handleUpdate}>

          <h2 className="profile-title">My Profile</h2>

          <Input type="email" value={user?.email || ""} disabled />

          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <p className="profile-info">
            Joined: {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </p>

          <Button type="submit">Save Changes</Button>

          <Button type="button" onClick={logout}>
            Logout
          </Button>

        </form>

      </div>
    </div>
  );
}