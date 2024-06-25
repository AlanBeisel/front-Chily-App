import { Product, Category } from '../types';


const API_URL = 'https://chilyapi.onrender.com';

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

export async function getProductsByCategoryId(
  id: string,
  page: number = 1,
  limit: number = 5,
): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${API_URL}/category/${id}?${queryParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener productos para la categoría ${id}`);
    }

    const categoryData: Category = await response.json();

    if (!categoryData || !categoryData.products) {
      throw new Error(`Datos de productos faltantes para la categoría ${id}`);
    }

    const products: Product[] = categoryData.products;
    return products;
  } catch (error) {
    console.error(`Error en getProductsByCategoryId para id ${id}:`, error);
    throw error;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://chilyapi.onrender.com/category', {
      method: 'GET',
      next: { revalidate: 3600 },
    })
    
    if (!res.ok) {
      throw new Error('Error al obtener las categorías');
    }
    const categories: Category[] = await res.json();
    console.log('Categorías obtenidas:', categories);
    return categories;
  } catch (error) {
    console.error('Error en getAllCategories:', error);
    throw error;
  }
}

export async function getCategoryWithProducts(id: string, page: number = 1, limit: number = 1): Promise<Category> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${API_URL}/category/${id}?${queryParams}`;
    const res = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Error al obtener la categoría ${id} con sus productos`);
    }

    const category: Category = await res.json();
    console.log('Categoría obtenida:', category);
    return category;
  } catch (error) {
    console.error(`Error en getCategoryWithProducts para id ${id}:`, error);
    throw error;
  }
}