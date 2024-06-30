export const web = new sst.aws.StaticSite("Web", {
	path: "./packages/web",
	build: {
		command: "npm run build",
		output: "./dist",
	},
});
