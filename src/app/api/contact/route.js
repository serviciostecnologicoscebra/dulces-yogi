import { submitContactRequest } from "@/server/services/contactService";
import { apiError } from "@/server/http/responses";

export async function POST(request) {
  try {
    const record = await submitContactRequest(await request.json());
    return Response.json({ data: { id: record.id }, message: "Recibimos tu solicitud" }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
