import { secret } from "./secret";

export const api = new sst.aws.Function("Api", {
	url: true,
	handler: "./packages/functions/src/index.handler",
	link: [secret.databaseUrl],
});

export const outputs = {
	api: api.url,
};
