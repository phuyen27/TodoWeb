import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "../components/Sidebar/Sidebar";
import useTasks from "../features/tasks/hooks/useTasks";
import usePet from "../features/pet/hooks/usePet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dashGif from "../assets/images/dashboash-gif.gif"; 
import "./Dashboard.css";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { tasks } = useTasks();
  const { pet } = usePet();
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total ? (completed / total) * 100 : 0;

  // ===== Greeting popup =====
  const [showGreeting, setShowGreeting] = useState(false);
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    setShowGreeting(true);
    const timer = setTimeout(() => setShowGreeting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ===== Pet mood =====
  const petMood = pet
    ? pet.mood === "happy"
      ? "😄"
      : "😢"
    : "❓";

  return (
    <div className="dashboard">
      <Sidebar onLogout={logout} />

      <div className="dashboard-content">
        {/* ===== Greeting Popup ===== */}
        {showGreeting && (
          <div className="greeting-popup">
            {greeting}, {user?.username}!
          </div>
        )}

        <h1 className="dash-title">
          {pet ? `${pet.name} ${petMood}` : "No pet yet"}
        </h1>

        {/* ===== STATS ===== */}
        <div className="dash-grid">

          {/* Pet Card */}
          <div className={`dash-card ${pet?.mood}`}>
            <h3 className="text-orange-400">🐾 Pet Mood</h3>
            {pet ? (
              <p className="pet-name">{pet.name}</p>
            ) : (
              <p>No pet yet</p>
            )}
          </div>

          {/* Tasks Card */}
          <div className="dash-card">
            <h3 className="text-orange-400">📋 Tasks</h3>
            <p className="text-lime-500">{completed} / {total} completed</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* ===== ACTIONS ===== */}
        <div className="dash-actions">
          <button onClick={() => navigate("/tasks")}>Go to Tasks</button>
          <button onClick={() => navigate("/pet")}>Visit Pet</button>
        </div>
      </div>
      <img src={dashGif} alt="dashboard animation" className="dashboard-gif" />
    </div>
  );
}