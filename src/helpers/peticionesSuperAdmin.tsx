import { Category, Product} from '@/types';
import { TransactionInfo } from '@/app/components/SuperAdminStripe/TransactionList';



const API_URL = process.env.NEXT_PUBLIC_API_URL;


const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    const errorMessage =
      contentType && contentType.indexOf('application/json') !== -1
        ? (await response.json()).message
        : await response.text();
    throw new Error(errorMessage || 'Error en la solicitud');
  }

  const data =
    contentType && contentType.indexOf('application/json') !== -1
      ? await response.json()
      : await response.text();

  return {
    success: true,
    data,
  };
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  const products: Product[] = await response.json();
  return products;
};

export const createProduct = async (data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear el producto', error);
    throw error;
  }
};

export const updateProduct = async (id: number, data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/products/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Error en la respuesta del servidor', text);
      throw new Error(text);
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return text;
    }
  } catch (error) {
    console.error('Error al eliminar el producto', error);
    throw error;
  }
};

export const PopularProduct = async (
  productId: number,
  status: boolean,
  token: string,
) => {
  try {
    const productIdNumber = productId;
    const statusString = status ? 'true' : 'false';
    console.log('productId (original):', productId);
    console.log('productIdNumber (convertido):', productIdNumber);
    console.log('status (booleano):', status);
    console.log('statusString (convertido a string):', statusString);
    const response = await fetch(
      `${API_URL}/products/popular?id=${productIdNumber}&status=${statusString}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error al marcar el producto como popular', error);
    throw error;
  }
};

export async function updateProductStock(
  productId: string,
  newStock: number,
  token: string,
) {
  try {
    const response = await fetch(
      `${API_URL}/products/stock?id=${productId}&stock=${newStock}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error en la petición', error);
    throw error;
  }
}

export const createCategory = async (data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/category/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al crear la categoría', error);
    throw error;
  }
};

export const updateCategory = async (id: string, data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/category/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar la categoria', error);
    throw error;
  }
};

export const deleteCategory = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/category/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar la categoria', error);
    throw error;
  }
};

export async function getCategoryById(
  id: string,
  token: string,
): Promise<Category> {
  try {
    const response = await fetch(`${API_URL}/category/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await handleResponse(response);
    if (!result.success) {
      throw new Error('Error al obtener la categoría');
    }
    return result.data as Category;
  } catch (error) {
    console.error(`Error en getCategoryById para id ${id}:`, error);
    throw error;
  }
}

export const deleteUser = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar el usuario', error);
    throw error;
  }
}

export const fecthUsers = async (page: number, limit: number, token: string) => {
  try{
    console.log(`Fetching users with page=${page}, limit=${limit}, token=${token}`);
  const response = await fetch (`${API_URL}/user?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
} catch (error) {
  console.error('Error al obtener los usuarios', error);
  throw error;
}
};

export const getUserById = async (userId:number, token: string) => {
  try{
    const response = await fetch(`${API_URL}/user/${userId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    console.log('Data de getUserById', data);
    return data;
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    throw error;
  }
};

export const updateUser = async (userId: number, data: any, token: string) => {
  try{
    const response = await fetch (`${API_URL}/user/${userId}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
    throw error;
  }
};

export const fetchTransactionInfo = async (token: string, page: number, limit: number, date?:string, amount?: number): Promise<TransactionInfo[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if(date) {
    queryParams.append('date', date);
  }

  if(amount !==undefined) {
    queryParams.append('amount', amount.toString());
  }
  
  try {
   const response = await fetch(`${API_URL}/payments/orders-info?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${token}`,
  },
});
const result = await handleResponse(response);
return result.data as TransactionInfo[];
} catch (error) {
  console.error('Error al obtener la informacion', error);
  throw error;
}
};