CREATE TABLE `client_testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`testimonial` text NOT NULL,
	`image` text DEFAULT '' NOT NULL,
	`image_alt` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`sort_order` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contact_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text NOT NULL,
	`consent` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`short_description` text NOT NULL,
	`long_description` text NOT NULL,
	`category` text NOT NULL,
	`price_in_cents` integer NOT NULL,
	`currency` text DEFAULT 'PEN' NOT NULL,
	`image` text NOT NULL,
	`image_alt` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`available` integer DEFAULT true NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);