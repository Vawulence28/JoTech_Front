"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const initializeAuth =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            return;
          }

          const data =
            await authService.getProfile();

          if (data?.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error(
            "Auth Error:",
            error
          );

          localStorage.removeItem(
            "token"
          );

          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    initializeAuth();
  }, []);

  const login = (
    token,
    user
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}