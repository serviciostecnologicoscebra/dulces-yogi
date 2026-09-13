# Yogi — tienda de dulces

Aplicación full stack para la dulcería Yogi. Incluye catálogo, búsqueda y filtros, detalle SEO de productos, carrito persistente, pedido por WhatsApp, testimonios y formulario de contacto.

## Tecnologías

- Next.js App Router sobre Vinext/Cloudflare Workers
- React 19, JavaScript y JSX
- Tailwind CSS 4 y Sass/SCSS
- TanStack React Query y Axios
- D1/SQLite con Drizzle ORM
- React Hook Form y Zod
- Vitest, Testing Library y Playwright

La versión publicable usa D1, la implementación SQLite compatible con Cloudflare Workers. La lógica de negocio depende de repositorios, por lo que puede sustituirse por otra implementación sin modificar las rutas ni los componentes.

## Inicio rápido

Requisitos: Node.js 22.13 o superior y pnpm.

```bash
cp .env.example .env.local
pnpm install
pnpm build
pnpm db:migrate:local
pnpm db:seed
pnpm dev
```

Antes de ejecutar `db:migrate:local`, el build debe haber generado `dist/server/wrangler.json`.

## Variables de entorno

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="51999999999"
NEXT_PUBLIC_CONTACT_PHONE="+51 999 999 999"
NEXT_PUBLIC_CONTACT_EMAIL="hola@yogi.pe"
NEXT_PUBLIC_BUSINESS_ADDRESS="Piura, Perú"
NEXT_PUBLIC_GOOGLE_MAPS_URL="https://maps.google.com/?q=Piura,Peru"
```

`NEXT_PUBLIC_WHATSAPP_NUMBER` debe contener el código de país y el número, preferiblemente sin espacios. Si está vacío, el CTA del carrito se desactiva con un mensaje claro.

## Scripts

| Comando | Uso |
| --- | --- |
| `pnpm dev` | Desarrollo local |
| `pnpm build` | Build de producción |
| `pnpm start` | Previsualiza el Worker construido |
| `pnpm lint` | Revisa el código |
| `pnpm test` | Ejecuta pruebas unitarias |
| `pnpm test:e2e` | Ejecuta Playwright |
| `pnpm db:generate` | Genera migraciones desde el esquema |
| `pnpm db:migrate:local` | Aplica la migración local |
| `pnpm db:seed` | Inserta 24 productos y 42 testimonios |

## Arquitectura

```text
src/
├── app/                 # Páginas, metadata y Route Handlers
├── components/          # UI común y layout
├── config/              # Datos comerciales configurables
├── constants/           # Rutas públicas
├── features/            # Products, clients, cart, contact, home
├── lib/                 # Axios, React Query y base de datos
├── providers/           # Providers de aplicación e hidratación
├── server/              # Datos, repositorios, servicios y validadores
├── styles/main.scss     # Único punto global de estilos
└── utils/               # Utilidades puras
```

Los archivos mínimos de `app/` en la raíz son adaptadores de compatibilidad para el runtime de publicación y reexportan la implementación organizada en `src/app`.

Cada componente mantiene su carpeta, `index.jsx` y `styles.scss`. Los estilos SCSS se registran únicamente desde `src/styles/main.scss`; los componentes no importan SCSS directamente.

## Editar el contenido

- Productos: `src/server/data/products.js`
- Clientes y testimonios: `src/server/data/clients.js`
- Datos comerciales: `src/config/site.js` o variables de entorno
- Rutas públicas: `src/constants/routes.js`
- Paleta y tokens: `src/styles/main.scss`
- Imágenes: `public/images`

Después de modificar los datos iniciales en una base ya creada, limpia las tablas locales o prepara un proceso de actualización explícito. El seed usa `INSERT OR IGNORE` para que sea reproducible.

## API

### `GET /api/products`

Parámetros: `search`, `category`, `minPrice`, `maxPrice`, `page`, `limit`, `featured` y `sort`.

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 24,
    "totalPages": 2
  }
}
```

### `GET /api/products/[slug]`

Devuelve `{ "data": product }`. Un slug inexistente responde `404` con error normalizado.

### `GET /api/clients`

Acepta `page`, `limit` y `featured`. Devuelve testimonios activos por `sortOrder`.

### `POST /api/contact`

```json
{
  "firstName": "Ana",
  "lastName": "Ruiz",
  "email": "ana@example.com",
  "phone": "+51 999 999 999",
  "message": "Quiero una caja para el sábado",
  "consent": true
}
```

Los errores siguen este contrato:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos",
    "details": []
  }
}
```

## WhatsApp

El carrito genera una URL `https://wa.me/...` con productos, cantidades, precios, subtotales y total estimado. No confirma ni cobra el pedido; Yogi debe confirmar disponibilidad, delivery y forma de pago.

## SEO y accesibilidad

Incluye metadata por página, canonical, Open Graph, Twitter Cards, sitemap, robots, JSON-LD de organización, sitio, breadcrumbs y producto; también navegación por teclado, foco visible, labels, mensajes `aria-live`, drawer con Escape y respeto por `prefers-reduced-motion`.

## Pruebas

Las pruebas unitarias cubren reducer y persistencia del carrito, totales, mensaje de WhatsApp, filtros, validación de contacto, paginación, clientes y producto inexistente. Playwright cubre catálogo, filtros, carrito y contacto en perfiles desktop y móvil.
