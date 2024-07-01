import { api } from "./api";

export const web = new sst.aws.StaticSite("Web", {
	path: "./packages/web",
	build: {
		command: "npm run build",
		output: "./dist",
	},
	environment: {
		VITE_API_URL: api.url,
	},
});
