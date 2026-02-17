// URL base de la API de Strapi
const STRAPI_URL = 'http://localhost:1337';

// Interfaces para tipar las respuestas de Strapi
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Función genérica para obtener datos de Strapi
export async function obtenerDeStrapi<T>(
  endpoint: string,
  params: string = ''
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${endpoint}${params ? `?${params}` : ''}`;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json() as StrapiResponse<T>;
    return datos;
  } catch (error) {
    console.error(`Error obteniendo ${endpoint}:`, error);
    throw error;
  }
}

// Exportar URL base para imágenes
export const STRAPI_URL_BASE = STRAPI_URL;