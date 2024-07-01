import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const connectionString = process.env.DB_URL;
const client = postgres(connectionString!);
export const db = drizzle(client);
