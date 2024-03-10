CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"state" varchar(255),
	"city" varchar(255)
);
