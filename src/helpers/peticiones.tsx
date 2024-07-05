import { Product, Category } from '../types';


// const API_URL = 'https://chilyapi.onrender.com';
const API_URL = 'http://localhost:3002'



export async function getProducts(
  page: number,
  limit: number,
  options: {
    filter?: number;
    search?: string;
    min?: number;
    max?: number;
    price?: 'min' | 'max';
    appliedFilters?: string[];
  } = {},
): Promise<any[]> {
  try {
    let url = new URL(`${API_URL}/products/filter`);

    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    if (options.filter !== undefined) {
      url.searchParams.append('filter', options.filter.toString());
    }
    if (options.search) {
      url.searchParams.append('search', options.search);
    }
    if (options.min !== undefined) {
      url.searchParams.append('min', options.min.toString());
    }
    if (options.max !== undefined) {
      url.searchParams.append('max', options.max.toString());
    }

    // Añadir price si existe
    if (options.price) {
      url.searchParams.append('price', options.price);
    }

    // Añadir filtros aplicados si existen y no hay price
    if (
      !options.price &&
      options.appliedFilters &&
      options.appliedFilters.length > 0
    ) {
      url.searchParams.append('filter', options.appliedFilters.join(','));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    const products: any[] = await response.json();
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
  appliedFilters?: string[],
): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (appliedFilters && appliedFilters.length > 0) {
      const filtersQueryParam = appliedFilters.join(',');
      queryParams.append('filter', filtersQueryParam);
    }
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
    const res = await fetch('http://localhost:3002/category', {
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
