import { defineConfig } from "drizzle-kit";
import { connectionString } from "./src/drizzle";

export default defineConfig({
	schema: "./src/**/*.sql.ts",
	dialect: "postgresql",
	out: "./drizzle",
	dbCredentials: {
		url: connectionString,
	},
});
