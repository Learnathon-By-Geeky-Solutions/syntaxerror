"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  image: string | null;
  provider: "google" | "local";
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // logout: () => void;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();


  const fetchUser = useCallback(async () => {
    try {
      if (session?.user) {
        console.log(session)
        // setUser({
        //   name: session.user.name || "",
        //   email: session.user.email || "",
        //   image: session.user.image || null,
        //   role: "Consumer", 
        //   provider: "google"
        // });
        
          const userResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${session.user.email}`
          );
  
          const userData = userResponse.data.data[0];
          console.log(userData)
          if (userData) {
            setUser({
              name: userData.name,
              email: userData.email,
              role: userData.role,
              image: userData.image,
              provider: userData.provider
            });
          }
        return;
        
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
        { withCredentials: true }
      );
      
      if (data.success) {
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${data.data.email}`
        );

        const userData = userResponse.data.data[0];
        console.log(userData)
        if (userData) {
          setUser({
            name: userData.name,
            email: userData.email,
            role: userData.role,
            image: userData.image,
            provider: userData.provider
          });
        }
      }
    } catch (err) {
      setError("Failed to fetch user");
      setUser(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  // const logout = async () => {
  //   try {
  //     if (user?.provider === "local") {
  //       await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {}, 
  //         { withCredentials: true }
  //       );
  //     }
  //     setUser(null);
  //     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = {
    user,
    isLoading,
    error,
    // logout,
    refetchUser: fetchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}