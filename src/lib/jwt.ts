"use server";
import "server-only";

import { User } from "@prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./db";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");

export const getUser = async () => {
	const token = (await cookies()).get("authentication")?.value;
	if (token == null) return null;

	try {
		const data = jwt.verify(token, JWT_SECRET) as Omit<User, "password">;

		const userExists = await prisma.user.findUnique({ where: { id: data.id } });
		if (!userExists) return null; // User does not exist

		return data;
	} catch {
		return null;
	}
};

export const setUser = async (user: Omit<User, "password">) => {
	const userExists = !!(await prisma.user.findUnique({ where: { id: user.id } }));
	if (!userExists) return; // User does not exist

	const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

	(await cookies()).set("authentication", token, { path: "/", httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
};

export const clearUser = async () => { (await cookies()).delete("authentication"); };
