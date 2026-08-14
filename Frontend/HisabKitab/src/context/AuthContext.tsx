import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import { guard } from "@/api/auth.guard.api";

type AuthType = {
  auth: boolean;
  loading: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const refreshAuth = async () => {
    try {
      const authenticated = await guard();
      setAuth(authenticated);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, loading, setAuth, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Use inside provider");
  }
  return context;
}
