"use server";
import "server-only";

import { Thing } from "@prisma";
import prisma from ".";
import { getUser } from "../jwt";
import { logCrud } from "../logging";

export const getAllThings = async (): Promise<Thing[]> => prisma.thing.findMany();

export const getThing = async (id: string): Promise<Thing | null> => prisma.thing.findUnique({ where: { id } });

export const createThing = async (data: Omit<Thing, "id" | "creatorId" | "creator">): Promise<Thing | null> => {
	const user = await getUser();
	if (!user) return null; // Unauthorized

	const newThing = await prisma.thing.create({ data: { creator: { connect: { id: user.id } }, ...data } });
	if (!newThing) return null; // Error

	logCrud("info", `Thing ${newThing.id} created by ${user.id}.`);

	return newThing;
};

export const updateThing = async (id: string, data: Partial<Omit<Thing, "id" | "creatorId" | "creator">>): Promise<Thing | null> => {
	const user = await getUser();
	if (!user) return null; // Unauthorized

	const thing = await getThing(id);
	if (!thing) return null; // Not found
	if (thing.creatorId !== user.id) return null; // Unauthorized

	await prisma.thing.update({ where: { id }, data });

	logCrud("info", `Thing ${id} updated by ${user.id}.`);

	return thing;
};

export const deleteThing = async (id: string): Promise<boolean> => {
	const user = await getUser();
	if (!user) return false; // Unauthorized

	const thing = await getThing(id);
	if (!thing) return false; // Not found
	if (thing.creatorId !== user.id) return false; // Unauthorized

	await prisma.thing.delete({ where: { id } });

	logCrud("info", `Thing ${id} deleted by ${user.id}.`);

	return true;
};
