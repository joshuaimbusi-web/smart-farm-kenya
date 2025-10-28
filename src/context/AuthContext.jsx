import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    if (user) {
      if (remember) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      }
    } else {
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");
    }
  }, [user, remember]);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, remember, setRemember }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

