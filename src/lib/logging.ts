import "server-only";

import fs from "node:fs";
import path from "node:path";

const log = (tag: string, level: string, message: string) => {
	tag = tag.trim();
	level = level.trim();

	const line = `${new Date().toISOString()} [${tag.toUpperCase()}] [${level.toUpperCase()}] ${message}`;

	const logDirectory = path.resolve(process.cwd(), "logs");
	if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory, { recursive: true });

	const logFile = path.resolve(logDirectory, "log-" + tag.toLowerCase() + ".log");
	const logFileGeneral = path.resolve(logDirectory, "log-general.log");

	fs.appendFileSync(logFile, line + "\n");
	fs.appendFileSync(logFileGeneral, line + "\n");
	console.log(line);
};

export const logAuth = (level: string, message: string) => log("auth", level, message);
export const logCrud = (level: string, message: string) => log("crud", level, message);
