import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";

import { LandingPage } from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PetPage from "./features/pet/PetPage";
import TasksPage from "./features/tasks/TaskPage";
import Profile from "./pages/Profile";

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

        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/tasks" 
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/pet" 
          element={
            <PrivateRoute>
              <PetPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;