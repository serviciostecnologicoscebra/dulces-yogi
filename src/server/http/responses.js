import { ZodError } from "zod";

export function apiError(error) {
  if (error instanceof ZodError) {
    return Response.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Los datos enviados no son válidos",
          details: error.issues.map(({ path, message }) => ({ field: path.join("."), message })),
        },
      },
      { status: 400 }
    );
  }
  console.error(error);
  return Response.json(
    { error: { code: "INTERNAL_ERROR", message: "No pudimos procesar la solicitud", details: [] } },
    { status: 500 }
  );
}
