import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {
  const [user, setUser] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem("user")
      );
    });

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }, [user]);

  const login = (email) => {
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}