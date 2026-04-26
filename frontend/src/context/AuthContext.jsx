import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

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

  // ✅ SIGNUP FIXED
  const signup = async (name, email, password) => {
    console.log("Signup Data:", name, email, password); // 🔥 DEBUG

    // ✅ validation
    if (!email || !password) {
      return { message: "Email and Password required" };
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name?.trim(),
          email: email?.trim().toLowerCase(), // ✅ important
          password
        })
      });

      const data = await res.json();

      if (data.token) {
        const userData = data.user || {
          id: "user_" + Date.now(),
          name,
          email
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(data.token);
        setUser(userData);
      }

      return data;
    } catch (error) {
      return { message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN FIXED (cleaned)
  const login = async (email, password) => {
    console.log("Login Data:", email, password); // 🔥 DEBUG

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email?.trim().toLowerCase(),
          password
        })
      });

      const data = await res.json();

      if (data.token) {
        const userData = data.user || {
          id: "user_" + Date.now(),
          name: email.split("@")[0],
          email
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(data.token);
        setUser(userData);
      }

      return data;
    } catch (error) {
      return { message: error.message };
    } finally {
      setLoading(false);
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