import { getProduct } from "@/server/services/catalogService";
import { apiError } from "@/server/http/responses";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const product = await getProduct(slug);
    if (!product) {
      return Response.json(
        { error: { code: "NOT_FOUND", message: "Producto no encontrado", details: [] } },
        { status: 404 }
      );
    }
    return Response.json({ data: product });
  } catch (error) {
    return apiError(error);
  }
}
