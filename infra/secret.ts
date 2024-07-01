export const secret = {
	databaseUrl: new sst.Secret("DatabaseUrl", process.env.DB_URL),
};
