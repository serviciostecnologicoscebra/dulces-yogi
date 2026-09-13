import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  category: text("category").notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  currency: text("currency").notNull().default("PEN"),
  image: text("image").notNull(),
  imageAlt: text("image_alt").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const clientTestimonials = sqliteTable("client_testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  testimonial: text("testimonial").notNull(),
  image: text("image").notNull().default(""),
  imageAlt: text("image_alt").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const contactRequests = sqliteTable("contact_requests", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});
