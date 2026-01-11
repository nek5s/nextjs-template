import "server-only";

import { PrismaClient } from "@prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
