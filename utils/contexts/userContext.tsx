"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@/utils/types/user";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: UserContextType;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
