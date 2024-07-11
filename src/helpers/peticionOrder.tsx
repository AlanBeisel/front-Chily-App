const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders (userId: string) {
  try{
    console.log(`Haciendo solicitud a: ${API_URL}/orders/user/${userId}`);
    const response = await fetch (`${API_URL}/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error recibido del servidor:', errorData)
      throw new Error (`Error al obtener órdenes del usuario: ${errorData.message}`);
    }

    const ordersData = await response.json();
    console.log('Datos de órdenes recibidos:', ordersData);

    if (ordersData.length === 0) {
      console.log('No se encontraron órdenes para el usuario:', userId);
    }

    return ordersData;
  } catch (error) {
    console.error('Error al obtener órdenes del usuario:', error);
    throw error;
  }
}

