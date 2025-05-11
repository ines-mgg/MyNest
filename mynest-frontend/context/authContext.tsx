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

const { ADMIN } = Role;
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
    if (res.status === 200) {
      const isAdminRole = res.data?.role === ADMIN;
      setIsAdmin(isAdminRole);
      return true;
    } else {
      setIsAdmin(false);
      return false;
    }
  };
  const login = (newToken: string) => {
    sessionStorage.setItem("MyNestToken", newToken);
    setToken(newToken);
  };

  const logout = useCallback(() => {
    sessionStorage.removeItem("MyNestToken");
    setToken(null);
  }, []);

  useEffect(() => {
    registerLogoutHandler(() => {
      logout();
    });
  }, [logout]);

  useEffect(() => {
    const checkSession = async () => {
      const storedToken = sessionStorage.getItem("MyNestToken");
      if (storedToken) {
        const isValid = await verifyToken();
        if (isValid) {
          setToken(storedToken);
        } else {
          sessionStorage.removeItem("MyNestToken");
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
