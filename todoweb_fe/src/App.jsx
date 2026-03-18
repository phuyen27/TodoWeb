import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

import { LandingPage } from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PetPage from "./features/pet/PetPage";
import TasksPage from "./features/tasks/TaskPage";
function App() {

  const { token } = useAuth();

  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path="/" 
          element={token ? <Dashboard /> : <LandingPage />} 
        />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tasks" element={<TasksPage />} />

        <Route path="/pet" element={<PetPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;