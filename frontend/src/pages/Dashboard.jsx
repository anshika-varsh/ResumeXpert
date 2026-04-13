import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ Use useEffect to navigate when user is not found
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // ✅ Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // ✅ Show nothing while redirecting
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="text-2xl font-bold">ResumeX AI</div>
          
          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition">
              <div className="text-3xl">👤</div>
              <div>
                <div className="font-semibold">{user.name || "User"}</div>
                <div className="text-sm opacity-80">Profile</div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-md p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-purple-600 mb-6">Dashboard</h3>
          
          <ul className="space-y-3">
            <li className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium">
              🏠 Overview
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium">
              📝 Build Resume
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium">
              📊 Analyze
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium">
              📁 My Resumes
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-purple-600 transition font-medium">
              ⚙️ Settings
            </li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back, <span className="text-purple-600">{user.name} 👋</span>
            </h1>
            <p className="text-gray-600 text-lg mt-2">AI-powered resume builder & analyzer made for you</p>
          </div>

          {/* STATS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h2 className="text-4xl font-bold text-purple-600 mb-2">5</h2>
              <p className="text-gray-600">Total Resumes</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h2 className="text-4xl font-bold text-purple-600 mb-2">78%</h2>
              <p className="text-gray-600">ATS Score</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h2 className="text-4xl font-bold text-purple-600 mb-2">3</h2>
              <p className="text-gray-600">AI Reviews</p>
            </div>

          </div>

          {/* FEATURES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Build Resume</h3>
              <p className="text-gray-600 mb-4">Create ATS optimized resume instantly</p>
              <button className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition">
                Start
              </button>
            </div>

           <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
  <div className="text-4xl mb-4">📤</div>
  <h3 className="text-xl font-bold text-gray-800 mb-2">Analyze Resume</h3>
  <p className="text-gray-600 mb-4">Get AI score + suggestions</p>
  <button 
    onClick={() => navigate("/analyze")}
    className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition">
    Upload
  </button>
</div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">My Resumes</h3>
              <p className="text-gray-600 mb-4">Access saved resumes anytime</p>
              <button className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition">
                Open
              </button>
            </div>

          </div>

          {/* ACTIVITY SECTION */}
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">Live</span>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-green-500 text-lg">✅</span>
                <span className="text-gray-700">Resume created successfully</span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-green-500 text-lg">✅</span>
                <span className="text-gray-700">AI score generated</span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-green-500 text-lg">✅</span>
                <span className="text-gray-700">Template applied</span>
              </li>
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}