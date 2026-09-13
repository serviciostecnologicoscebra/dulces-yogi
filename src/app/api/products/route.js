import { getProducts } from "@/server/services/catalogService";
import { apiError } from "@/server/http/responses";

export async function GET(request) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams);
    return Response.json(await getProducts(query));
  } catch (error) {
    return apiError(error);
  }
}
