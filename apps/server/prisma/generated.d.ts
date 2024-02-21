/* eslint-disable */
import type { Prisma, Event } from "./client";
export default interface PrismaTypes {
    Event: {
        Name: "Event";
        Shape: Event;
        Include: never;
        Select: Prisma.EventSelect;
        OrderBy: Prisma.EventOrderByWithRelationInput;
        WhereUnique: Prisma.EventWhereUniqueInput;
        Where: Prisma.EventWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}