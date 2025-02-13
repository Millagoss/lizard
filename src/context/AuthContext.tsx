"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{
  user: User | null;
  logout: () => Promise<void>;
}>({
  user: null,
  logout: async () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  console.log(user, "user");
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
