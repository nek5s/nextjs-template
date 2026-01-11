"use server";
import "server-only";

import { clearUser, setUser } from "@/lib/jwt";
import { logAuth } from "@/lib/logging";
import { User } from "@prisma";
import bcrypt from "bcrypt";
import prisma from ".";

export const signUp = async (id: string, password: string): Promise<User | null> => {
	id = id.toLowerCase().trim();
	password = password.trim();

	const existing = await prisma.user.findUnique({ where: { id } });
	if (existing) return null; // User already exists

	const passwordHash = await bcrypt.hash(password, 12);

	await prisma.user.create({ data: { id, password: passwordHash } });

	await setUser({ id });

	logAuth("info", `User "${id}" signed up.`);

	return { id, password };
};

export const signIn = async (id: string, password: string): Promise<User | null> => {
	id = id.toLowerCase().trim();
	password = password.trim();

	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return null; // User not found

	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) return null; // Incorrect password

	await setUser({ id });

	logAuth("info", `User "${id}" signed in.`);

	return user;
};

export const signOut = async () => clearUser();
