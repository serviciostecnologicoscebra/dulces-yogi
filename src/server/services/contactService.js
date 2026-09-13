import { createContactRequest } from "@/server/repositories/contactRepository";
import { contactSchema } from "@/server/validators/schemas";

export async function submitContactRequest(input) {
  const values = contactSchema.parse(input);
  return createContactRequest(values);
}
