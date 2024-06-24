import { Product } from '../types';

const API_URL = 'https://ejemplo.com';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error en getProductById para id ${id}:`, error);
    throw error;
  }
}

export async function getPopularProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products?popular=true`);
    if (!response.ok) {
      throw new Error('Error al obtener productos populares');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getPopularProducts:', error);
    throw error;
  }
}
