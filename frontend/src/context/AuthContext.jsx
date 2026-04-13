import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// यह एक proper component है
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser && storedUser !== "undefined") {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);


  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        
        const userData = data.user || {
          id: "user_" + Date.now(),
          name: name,
          email: email
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(data.token);
        setUser(userData);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return { message: error.message };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }


        
        // ✅ ADD THIS: Store user data
        const userData = data.user || {
          id: "user_" + Date.now(),
          name: email.split("@")[0],
          email: email
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(data.token);
        setUser(userData);
      

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return { message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}