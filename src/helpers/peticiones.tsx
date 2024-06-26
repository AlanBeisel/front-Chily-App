import { Product, Category } from '../types';


const API_URL = 'https://chilyapi.onrender.com';


export async function getProducts(
  page: number,
  limit: number,
  appliedFilters?: string[],
): Promise<any[]> {
  try {
    let url = `${API_URL}/products?page=${page}&limit=${limit}`;

    if (appliedFilters && appliedFilters.length > 0) {
      const filtersQueryParam = appliedFilters
        .map((filter) => `filter=${filter}`)
        .join('&');
      url = `${url}&${filtersQueryParam}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    const products: any[] = await response.json();
    console.log('Productos obtenidos:', products);
    return products;
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


export async function getProductsByCategoryId(
  id: string,
  page: number,
  limit: number,
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
    console.log("productos del helper" , products)
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
    return categories;
  } catch (error) {
    console.error('Error en getAllCategories:', error);
    throw error;
  }
}
