"use client";

import { User } from "@prisma";
import React from "react";

export const AuthContext = React.createContext<Omit<User, "password"> | null>(null);

export const AuthProvider = ({ user, children }: Readonly<{ user: Omit<User, "password"> | null, children?: React.ReactNode }>) => <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;

export const useAuth = () => React.useContext(AuthContext);
