'use client'
import React, {useState} from 'react';
import ProductForm from './productForm';
import { createProduct } from '@/helpers/peticionesSuperAdmin';
import BackButton from '../ProductIdComponents/BackButton';
//import { useRouter } from 'next/router';


interface ProductData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string[];

}

const ProductCreate: React.FC = () => {
 // const router = useRouter();
 const [error, setError] = useState<string | null>(null);
 const [, setModalOpen] = useState(false);
 const [formData, setFormData] = useState<ProductData>({
  name: '',
  description: '',
  category: [],
  price: '',
  image: '',
 });


 const uploadImageToCloudinary = async(file: File) =>{
  const formData = new FormData();
  formData.append('file', file);
  formData.append ('upload_preset', 'process.env.CLOUDINARY_UPLOAD_PRESET!');
  formData.append ('upload_preset', 'process.env.CLOUDINARY_CLOUD_NAME!');

  try{
  const response = await fetch(`https://api.cloudinary.com/v1_1/+ process.env.CLOUDINARY_CLOUD_NAME +/image/upload`,{
    method: 'POST',
    body: formData,
  });

  if(!response.ok) {
    throw new Error('Error al subir la imagen a Cloudinary');
  }

  const data= await response.json();
  console.log('Imagen subida correctamente:', data);
  return data.secure_url;
} catch (error) {
  console.error('Error al subir la imagem a Cloudinary', error);
  throw error;
}
 };

  const handleCreate = async (data: ProductData, imageFile?: File) => {
    try{
      console.log(data)
      setFormData(data)
      setModalOpen(true);

      let imageUrl = '';
      if (imageFile) {
        imageUrl= await uploadImageToCloudinary(imageFile);
      }

      const formattedData ={
        ...data,
        image: imageUrl,
        price: parseFloat(data.price),
        category: data.category.map((cat: string) => parseInt(cat, 10)),
      };

      const response = await createProduct(formattedData);
      const responseData = await response.json();

      if(responseData.success){
        setError(null);
        setModalOpen(false);
      } else {
        setError(responseData.error || 'Error al crear el producto');
      }
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al crear el producto. Inténtalo de nuevo más tarde.');
      }
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-4">
        <div className="flex items-center justify-start  mb-4">
          <BackButton />
      </div>
      {error && <div className="text-red-500 mb-4"> {error}</div>}
      <ProductForm onSubmit={handleCreate} defaultValues={formData} />
    </div>
    </div>
  );
};

export default ProductCreate;