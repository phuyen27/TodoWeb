import { useAuth } from "../context/AuthContext";

export default function Dashboard(){

  const { logout } = useAuth();

  return(

    <div className="dashboard">

      <header className="header">
        <h2>My Todo Dashboard</h2>
        <div>🔥 Streak: 5 days</div>
      </header>

    </div>

  );
}