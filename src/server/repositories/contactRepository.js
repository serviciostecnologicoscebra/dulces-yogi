import { getDb } from "@/lib/db";
import { contactRequests } from "@/lib/db/schema";

export async function createContactRequest(values) {
  const record = {
    id: crypto.randomUUID(),
    ...values,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await getDb().insert(contactRequests).values(record);
  return record;
}
