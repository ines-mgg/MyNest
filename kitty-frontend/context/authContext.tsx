"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api, { registerLogoutHandler } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Role } from "@/types/user";

type AuthContextType = {
  token: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const verifyToken = async () => {
    const res = await api.get("/auth");
    setIsAdmin(res.data.role === Role.ADMIN)
    return res.status === 200;
  };
  const login = (newToken: string) => {
    sessionStorage.setItem("kittyToken", newToken);
    setToken(newToken);
  };

  const logout = useCallback(() => {
    sessionStorage.removeItem("kittyToken");
    setToken(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    registerLogoutHandler(() => {
      logout();
    });
  }, [logout]);

  useEffect(() => {
    const checkSession = async () => {
      const storedToken = sessionStorage.getItem("kittyToken");
      if (storedToken) {
        const isValid = await verifyToken();
        if (isValid) {
          setToken(storedToken);
        } else {
          sessionStorage.removeItem("kittyToken");
          router.push("/login");
        }
      }
      setCheckingAuth(false);
    };

    checkSession();
  }, [router]);

  const value = {
    token,
    isAuthenticated: !!token,
    isAdmin,
    login,
    logout,
    checkingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
