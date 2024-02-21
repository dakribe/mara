import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '../db';
import PrismaTypes from '../../prisma/generated';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
}>({
	plugins: [PrismaPlugin],
	prisma: {
		client: db,
	},
});

builder.queryType();
builder.mutationType();
