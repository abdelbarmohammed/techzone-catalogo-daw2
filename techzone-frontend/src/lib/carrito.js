// @ts-nocheck
// Clave para localStorage
const CARRITO_KEY = 'galeriatech_carrito';

// Verificar si estamos en el navegador
function esNavegador() {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

// Obtener carrito desde localStorage
export function obtenerCarrito() {
  if (!esNavegador()) return [];
  
  try {
    const datos = window.localStorage.getItem(CARRITO_KEY);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return [];
  }
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  if (!esNavegador()) return;
  
  try {
    window.localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    window.dispatchEvent(new CustomEvent('carrito-actualizado', { detail: carrito }));
  } catch (error) {
    console.error('Error al guardar carrito:', error);
  }
}

// Añadir producto al carrito
export function anadirAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(item => item.id === producto.id);
  
  if (indice >= 0) {
    carrito[indice].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  
  guardarCarrito(carrito);
}

// Eliminar producto del carrito
export function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito();
  const nuevoCarrito = carrito.filter(item => item.id !== id);
  guardarCarrito(nuevoCarrito);
}

// Actualizar cantidad de un producto
export function actualizarCantidad(id, cantidad) {
  if (cantidad < 1) {
    eliminarDelCarrito(id);
    return;
  }
  
  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(item => item.id === id);
  
  if (indice >= 0) {
    carrito[indice].cantidad = cantidad;
    guardarCarrito(carrito);
  }
}

// Obtener cantidad total de items
export function obtenerCantidadTotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Obtener precio total
export function obtenerPrecioTotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Vaciar carrito
export function vaciarCarrito() {
  guardarCarrito([]);
}