// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // <- new

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
    setLoading(false); // <- set when done
  }, []);

  const login = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  // Don't render anything until loading is complete
  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
