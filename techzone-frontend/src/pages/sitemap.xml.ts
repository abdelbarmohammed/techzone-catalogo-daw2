import type { APIRoute } from 'astro';
import { obtenerDeStrapi } from '../lib/strapi';

interface Producto {
  slug: string;
  updatedAt: string;
}

interface Categoria {
  slug: string;
  updatedAt: string;
}

interface Articulo {
  slug: string;
  updatedAt: string;
}

export const GET: APIRoute = async () => {
  const sitioUrl = 'https://galeriatech.es';
  const fechaActual = new Date().toISOString().split('T')[0];

  // Obtener datos de Strapi
  let productos: Producto[] = [];
  let categorias: Categoria[] = [];
  let articulos: Articulo[] = [];

  try {
    const resProductos = await obtenerDeStrapi<Producto[]>('productos', 'fields[0]=slug&fields[1]=updatedAt');
    productos = resProductos.data || [];

    const resCategorias = await obtenerDeStrapi<Categoria[]>('categorias', 'fields[0]=slug&fields[1]=updatedAt');
    categorias = resCategorias.data || [];

    const resArticulos = await obtenerDeStrapi<Articulo[]>('articulos', 'fields[0]=slug&fields[1]=updatedAt');
    articulos = resArticulos.data || [];
  } catch (e) {
    console.error('Error generando sitemap:', e);
  }

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Páginas estáticas -->
  <url>
    <loc>${sitioUrl}/</loc>
    <lastmod>${fechaActual}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${sitioUrl}/productos</loc>
    <lastmod>${fechaActual}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${sitioUrl}/blog</loc>
    <lastmod>${fechaActual}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${sitioUrl}/contacto</loc>
    <lastmod>${fechaActual}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Productos dinámicos -->
${productos.map(p => `  <url>
    <loc>${sitioUrl}/productos/${p.slug}</loc>
    <lastmod>${p.updatedAt ? p.updatedAt.split('T')[0] : fechaActual}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Categorías dinámicas -->
${categorias.map(c => `  <url>
    <loc>${sitioUrl}/categorias/${c.slug}</loc>
    <lastmod>${c.updatedAt ? c.updatedAt.split('T')[0] : fechaActual}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}

  <!-- Artículos del blog -->
${articulos.map(a => `  <url>
    <loc>${sitioUrl}/blog/${a.slug}</loc>
    <lastmod>${a.updatedAt ? a.updatedAt.split('T')[0] : fechaActual}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
