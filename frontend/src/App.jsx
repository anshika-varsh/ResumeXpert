import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import { ProtectedRoute } from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />          
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     <Route 
        path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
      />
       <Route path="/analyze" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;