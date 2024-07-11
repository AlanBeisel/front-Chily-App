import { Category, Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if(!response.ok) {
    const errorMessage = contentType && contentType.indexOf('application/json') ! ==-1
    ? (await response.json()).message
    : await response.text();
    throw new Error(errorMessage || 'Error en la solicitud');
  }
  return contentType && contentType.indexOf('application/json') !== -1
  ? response.json()
  : response.text();
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if(!response.ok) {
    throw new Error ('Error al obtener los productos');
  }
  const products: Product[] = await response.json();
  return products;
};

export const createProduct = async (data: any) => {
  try{
    const response = await fetch(`${API_URL}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al crear el producto', error);
    throw error;
  }
};

export const updateProduct = async (id: string, data:any) => {
  try {
    const response = await fetch(`${API_URL}/products/update/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error al actualizar el producto', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/delete/${id}`, {
      method: 'DELETE',
    });

    const text = await response.text();

    if(!response.ok) {
      const text = await response.text();
      console.error('Error en la respuesta del servidor', text);
      throw new Error(text);
    }

    try{
      return JSON.parse(text);
    } catch (error) {
      return text;
    }
  }catch (error) {
    console.error('Error al eliminar el producto', error);
    throw error;
  }
};

export const PopularProduct = async (productId: string, status: boolean) => {
  try{
    const productIdNumber = parseInt(productId, 10)
    const statusString = status ? 'true' : 'false';
    console.log('productId (original):', productId);
    console.log('productIdNumber (convertido):', productIdNumber);
    console.log('status (booleano):', status);
    console.log('statusString (convertido a string):', statusString);
     const response = await fetch(`${API_URL}/products/popular?id=${productIdNumber}&status=${statusString}`, {
     method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
    },
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error al marcar el producto como popular', error);
    throw error;
  }
};

export async function updateProductStock(productId: string, newStock:number) {
  try{
    const response = await fetch(`${API_URL}/products/stock?id=${productId}&stock=${newStock}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error en la petición', error);
    throw error;
  }
}

export const createCategory = async (data: any) => {
  try{
    const response = await fetch(`${API_URL}/category/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al crear la categoría', error);
    throw error;
  }
};

export const updateCategory = async (id: string, data:any) => {
  try {
    const response = await fetch(`${API_URL}/category/update/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error al actualizar la categoria', error);
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/category/delete/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }catch (error) {
    console.error('Error al eliminar la categoria', error);
    throw error;
  }
};

export async function getCategoryById(id: string): Promise<Category> {
  try {
    const response = await fetch(`${API_URL}/category/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en getCategoryById para id ${id}:`, error);
    throw error;
  }
}
