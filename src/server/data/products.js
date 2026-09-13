const images = {
  gomitas: "/images/products/gomitas.webp",
  marshmallows: "/images/products/marshmallows.webp",
  cintas: "/images/products/cintas.webp",
  paletas: "/images/products/paletas.webp",
  bombones: "/images/products/bombones.webp",
  chocolate: "/images/products/chocolate.webp",
  helado: "/images/products/helado.webp",
  estrellas: "/images/products/estrellas.webp",
};

const now = "2026-09-12T00:00:00.000Z";

const baseProducts = [
  ["ositos-rubi", "Ositos Rubí", "Gomitas", 1800, images.gomitas, "Gomitas de ositos color rubí", true],
  ["nubes-yogi", "Nubes Yogi", "Bombones", 1600, images.marshmallows, "Nubes de vainilla rosadas y blancas", true],
  ["cintas-pop", "Cintas Pop", "Caramelos", 1400, images.cintas, "Cintas ácidas de sabores frutales", true],
  ["rosas-de-cristal", "Rosas de Cristal", "Paletas", 2000, images.paletas, "Paletas rojas con forma de rosa", true],
  ["bombones-aurora", "Bombones Aurora", "Bombones", 2800, images.bombones, "Bombones de chocolate rellenos", true],
  ["chocolate-noche", "Chocolate Noche", "Chocolates", 2400, images.chocolate, "Tableta intensa de cacao", false],
  ["paleta-rubi", "Paleta Rubí", "Paletas", 1200, images.paletas, "Paleta brillante y crocante", false],
  ["chocoteja-caramelo", "Chocoteja Caramelo", "Chocotejas", 1000, images.bombones, "Pecanas y caramelo suave", false],
  ["helado-nube", "Helado Nube", "Helados", 1500, images.helado, "Vainilla cremosa con nubes", false],
  ["trufas-violeta", "Trufas Violeta", "Bombones", 2600, images.bombones, "Ganache delicada de cacao", false],
  ["corazones-fresa", "Corazones Fresa", "Gomitas", 1800, images.gomitas, "Corazones tiernos de fresa", false],
  ["tableta-almendra", "Tableta Almendra", "Chocolates", 2200, images.chocolate, "Cacao con almendras tostadas", false],
  ["paleta-cielo", "Paleta Cielo", "Paletas", 1500, images.paletas, "Algodón de azúcar y vainilla", false],
  ["bombon-pistacho", "Bombón Pistacho", "Bombones", 3000, images.bombones, "Chocolate blanco y pistacho", false],
  ["chocoteja-cafe", "Chocoteja Café", "Chocotejas", 1100, images.bombones, "Café peruano y chocolate", false],
  ["helado-frambuesa", "Helado Frambuesa", "Helados", 1600, images.helado, "Frambuesa fresca y cremosa", false],
  ["caramelos-perla", "Caramelos Perla", "Caramelos", 1400, images.marshmallows, "Perlas dulces de vainilla", false],
  ["praline-rosa", "Praliné Rosa", "Bombones", 3200, images.bombones, "Praliné de avellana y fresa", false],
  ["gomitas-estrella", "Gomitas Estrella", "Gomitas", 1700, images.estrellas, "Estrellas de sabores frutales", false],
  ["caja-yogi", "Caja Yogi", "Regalos", 4500, "/images/brand/story.webp", "Una selección especial para regalar", true],
  ["caja-corazon", "Caja Corazón", "Regalos", 5200, "/images/brand/hero.webp", "Dulces elegidos para alguien especial", false],
  ["chocolate-rosa", "Chocolate Rosa", "Chocolates", 2500, images.chocolate, "Chocolate con frutos rojos", false],
  ["paletas-fiesta", "Paletas Fiesta", "Paletas", 1900, images.paletas, "Rosas dulces para celebrar", false],
  ["gomitas-luz", "Gomitas Luz", "Gomitas", 1300, images.estrellas, "Estrellas suaves en colores pastel", false],
];

export const PRODUCT_SEEDS = Object.freeze(
  baseProducts.map(([slug, name, category, priceInCents, image, imageAlt, featured], index) => ({
    id: `product-${String(index + 1).padStart(2, "0")}`,
    slug,
    name,
    shortDescription: imageAlt.replace(/^./, (letter) => letter.toUpperCase()) + ".",
    longDescription: `${name} combina sabor, color y textura en una presentación cuidada. Ideal para regalar, compartir o darte un gusto sin esperar una ocasión especial.`,
    category,
    priceInCents,
    currency: "PEN",
    image,
    imageAlt,
    featured,
    available: index !== 21,
    createdAt: now,
    updatedAt: now,
  }))
);
