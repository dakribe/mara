import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/**/*.sql.ts",
	out: "./migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DB_URL!,
	},
});
