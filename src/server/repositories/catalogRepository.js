import { and, asc, count, desc, eq, gte, like, lte, ne } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { clientTestimonials, products } from "@/lib/db/schema";
import { CLIENT_SEEDS } from "@/server/data/clients";
import { PRODUCT_SEEDS } from "@/server/data/products";

let seeded = false;

async function ensureSeedData(db) {
  if (seeded) return;
  const [productCount] = await db.select({ value: count() }).from(products);
  const [clientCount] = await db.select({ value: count() }).from(clientTestimonials);
  if (!productCount.value) await db.insert(products).values(PRODUCT_SEEDS).onConflictDoNothing();
  if (!clientCount.value) await db.insert(clientTestimonials).values(CLIENT_SEEDS).onConflictDoNothing();
  seeded = true;
}

function productOrder(sort) {
  const map = {
    "name-asc": asc(products.name),
    "name-desc": desc(products.name),
    "price-asc": asc(products.priceInCents),
    "price-desc": desc(products.priceInCents),
    featured: desc(products.featured),
  };
  return map[sort] || map.featured;
}

export async function findProducts(filters) {
  const db = getDb();
  await ensureSeedData(db);
  const conditions = [];
  if (filters.search) conditions.push(like(products.name, `%${filters.search}%`));
  if (filters.category) conditions.push(eq(products.category, filters.category));
  if (filters.minPrice !== undefined) conditions.push(gte(products.priceInCents, Math.round(filters.minPrice * 100)));
  if (filters.maxPrice !== undefined) conditions.push(lte(products.priceInCents, Math.round(filters.maxPrice * 100)));
  if (filters.featured !== undefined) conditions.push(eq(products.featured, filters.featured));
  const where = conditions.length ? and(...conditions) : undefined;
  const [totalRow] = await db.select({ value: count() }).from(products).where(where);
  const data = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(productOrder(filters.sort), asc(products.name))
    .limit(filters.limit)
    .offset((filters.page - 1) * filters.limit);
  return { data, totalItems: totalRow.value };
}

export async function findProductBySlug(slug) {
  const db = getDb();
  await ensureSeedData(db);
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return product || null;
}

export async function findRelatedProducts(product, limit = 4) {
  const db = getDb();
  return db.select().from(products).where(and(eq(products.category, product.category), ne(products.slug, product.slug))).limit(limit);
}

export async function findClients(filters) {
  const db = getDb();
  await ensureSeedData(db);
  const conditions = [eq(clientTestimonials.active, true)];
  if (filters.featured !== undefined) conditions.push(eq(clientTestimonials.featured, filters.featured));
  const where = and(...conditions);
  const [totalRow] = await db.select({ value: count() }).from(clientTestimonials).where(where);
  const data = await db
    .select()
    .from(clientTestimonials)
    .where(where)
    .orderBy(asc(clientTestimonials.sortOrder))
    .limit(filters.limit)
    .offset((filters.page - 1) * filters.limit);
  return { data, totalItems: totalRow.value };
}
