const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders (userId: string) {
  try{
    const response = await fetch (`${API_URL}/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error ('Error al obtener órdenes del usuario');
    }

    const ordersData = await response.json();
    return ordersData;
  } catch (error) {
    console.error('Error al obtener órdenes del usuario:', error);
    throw error;
  }
}

