import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

const app = fastify({
	logger: {
		enabled: true,
	},
});

const yoga = createYoga<{
	req: FastifyRequest;
	reply: FastifyReply;
}>({
	schema,
});

app.route({
	url: yoga.graphqlEndpoint,
	method: ['GET', 'POST', 'OPTIONS'],
	handler: async (req, reply) => {
		const response = await yoga.handleNodeRequest(req, {
			req,
			reply,
		});

		response.headers.forEach((value, key) => {
			reply.header(key, value);
		});

		reply.status(response.status);

		reply.send(response.body);

		return reply;
	},
});

app.listen({
	port: 4000,
});
