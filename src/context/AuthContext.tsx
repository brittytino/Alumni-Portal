
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { users as initialUsers } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (regNo: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  register: (userData: Omit<User, "id">) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Initialize users in localStorage if not present
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  const login = async (regNo: string, password: string) => {
    const foundUser = users.find(
      (u) => u.regNo === regNo && u.mobileNumber === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast({
        title: "Welcome back!",
        description: `Good to see you, ${foundUser.studentName}!`,
      });
      return true;
    }

    toast({
      title: "Login failed",
      description: "Invalid registration number or password.",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully.",
    });
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    if (user?.id === updatedUser.id) {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    
    // Trigger a storage event so other components can update
    window.dispatchEvent(new Event("storage"));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
