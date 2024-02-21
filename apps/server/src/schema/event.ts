import { db } from '../db';
import { builder } from './builder';

builder.prismaObject('Event', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		city: t.exposeString('city'),
		state: t.exposeString('state'),
	}),
});

builder.queryFields((t) => ({
	getAll: t.prismaField({
		type: ['Event'],
		resolve: async () => {
			return await db.event.findMany();
		},
	}),
	getById: t.prismaField({
		type: 'Event',
		args: {
			id: t.arg.string(),
		},
		resolve: async (_, __, args) => {
			const event = await db.event.findUnique({
				where: {
					id: args.id!,
				},
			});
			if (!event) {
				throw new Error('No event found');
			}
			return event;
		},
	}),
}));

const CreateEventInput = builder.inputType('CreateEventInput', {
	fields: (t) => ({
		title: t.string({ required: true }),
		city: t.string({ required: true }),
		state: t.string({ required: true }),
	}),
});

builder.mutationFields((t) => ({
	createEvent: t.prismaField({
		type: 'Event',
		nullable: true,
		args: {
			input: t.arg({ type: CreateEventInput, required: true }),
		},
		resolve: async (_, __, { input }) => {
			const event = await db.event.create({
				data: {
					title: input.title,
					city: input.city,
					state: input.state,
				},
			});
			return event;
		},
	}),
}));
