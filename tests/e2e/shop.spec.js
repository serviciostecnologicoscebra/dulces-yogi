import { expect, test } from "@playwright/test";

test("flujo principal del catálogo y carrito", async ({ page }) => {
  await page.goto("/dulcecitos");
  await expect(page.getByRole("heading", { name: /elige tu próximo antojo/i })).toBeVisible();
  await page.getByPlaceholder("Buscar dulce").fill("Ositos");
  await expect(page.getByText("Ositos Rubí").first()).toBeVisible();
  await page.getByRole("button", { name: /añadir al carrito/i }).first().click();
  await expect(page.getByRole("dialog", { name: /carrito yogi/i })).toBeVisible();
  await expect(page.getByText(/total estimado/i)).toBeVisible();
});

test("envía el formulario de contacto", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByLabel("Nombres").fill("Ana");
  await page.getByLabel("Apellidos").fill("Ruiz");
  await page.getByLabel("Correo electrónico").fill("ana@example.com");
  await page.getByLabel("Número de contacto").fill("999999999");
  await page.getByLabel("Mensaje").fill("Quiero preparar una caja especial para el sábado");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(page.getByText(/recibimos tu solicitud/i)).toBeVisible();
});
