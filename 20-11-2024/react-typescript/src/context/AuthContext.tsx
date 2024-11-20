import React, { createContext, useState, useContext } from "react";
import { User } from "../models/AuthUserModel";
import { useNavigate } from "react-router-dom";

export interface AuthContextState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user_token", JSON.stringify(user));
    navigate("/bank-app");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
