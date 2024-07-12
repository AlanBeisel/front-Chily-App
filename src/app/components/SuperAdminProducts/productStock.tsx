import React, {useState} from 'react';
import { updateProductStock } from '@/helpers/peticionesSuperAdmin';

interface ProductStockUpdateProps{
  productId: string;
  currentStock: number;
}

const ProductStockUpdate: React.FC<ProductStockUpdateProps> = ({productId, currentStock}) => {
  const [newStock, setNewStock] = useState<number>(currentStock);

  const handleStockUpdate = async () =>{
    try{
      await updateProductStock(productId, newStock);
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