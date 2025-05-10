-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `regions` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`name` text,
	`surname` text NOT NULL,
	`birth` numeric,
	`gender` text,
	`username` text
);
--> statement-breakpoint
CREATE TABLE `contests` (
	`year` integer PRIMARY KEY,
	`location` text,
	`region` text,
	`gmaps` text,
	`latitude` real,
	`longitude` real
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`contest_year` integer NOT NULL,
	`idx` integer,
	`max_score_possible` real,
	`title` text,
	`link` text,
	FOREIGN KEY (`contest_year`) REFERENCES `contests`(`year`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `participations` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`contest_year` integer NOT NULL,
	`rank` integer,
	`school` text,
	`venue` text,
	`medal` text,
	`internationals` text,
	`score` real,
	FOREIGN KEY (`contest_year`) REFERENCES `contests`(`year`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task_scores` (
	`id` text PRIMARY KEY,
	`task_id` text NOT NULL,
	`participation_id` text NOT NULL,
	`score` real,
	FOREIGN KEY (`participation_id`) REFERENCES `participations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `internationals` (
	`code` text PRIMARY KEY,
	`name` text NOT NULL,
	`link` text,
	`color` text
);

*/