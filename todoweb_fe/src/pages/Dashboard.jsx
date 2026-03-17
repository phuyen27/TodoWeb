import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar/Sidebar";
export default function Dashboard(){

  const { logout } = useAuth();

  return(

    <div className="dashboard">

      <Sidebar onLogout={logout} />

      <div className="dashboard-content">
       
      </div>

    </div>

  );
}