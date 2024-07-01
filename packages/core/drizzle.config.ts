import { defineConfig } from "drizzle-kit";
import { connectionString } from "./src/drizzle";

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	dialect: "postgresql",
	out: "./drizzle",
	dbCredentials: {
		url: connectionString,
	},
});
