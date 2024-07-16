import React, {useState} from 'react';
import { updateProductStock } from '@/helpers/peticionesSuperAdmin';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProductStockUpdateProps{
  productId: string;
  currentStock: number;
}

const ProductStockUpdate: React.FC<ProductStockUpdateProps> = ({productId, currentStock}) => {
  const [newStock, setNewStock] = useState<number>(currentStock);
  const {accessToken} = useAuth();

  const handleStockUpdate = async () =>{
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    try{
      await updateProductStock(productId, newStock, accessToken);
      console.log('Stock actualizado correctamente');
    }catch (error) {
      console.error('Error al actualizar el stock', error);
    }
  };

  return(
    <div>
      <input
      type="number"
      value={newStock}
      onChange={(e) => setNewStock(Number(e.target.value))}
      />
      <button onClick = {handleStockUpdate}>Actualizar Stock</button>
    </div>
  );
}
export default ProductStockUpdate;