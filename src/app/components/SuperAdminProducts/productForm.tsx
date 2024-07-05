import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAllCategories } from '@/helpers/peticiones';


const ProductData = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().min(1, 'Descripción es requerida'),
  price: z.number().positive('El precio debe ser un número positivo').nonnegative(),
  stock: z.number().int().min(0, 'El stock debe ser un número entero no negativo'),
  image: z.any().optional(),
  category: z.array(z.number()).min(1, 'Debe seleccionar al menos una categoría'),
});

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  defaultValues?: any;
  onSubmit: (data: any, imageFile?: File) => void; 
  isEditMode?: boolean;
  closeDropdownOnSelect?: boolean;
};

const ProductForm: React.FC<ProductFormProps> = ({ defaultValues, onSubmit, isEditMode, closeDropdownOnSelect = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProductData),
    defaultValues,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultValues?.category || []);
  const [, setShowCategoryCard] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null); 

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    if (defaultValues?.category) {
      setSelectedCategories(defaultValues.category);
      console.log('Categorías seleccionadas actualizadas:', defaultValues.category);
    }
  }, [defaultValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories(prevCategories => {
      if (!prevCategories.includes(categoryId)) {
        return [...prevCategories, categoryId];
      }
      return prevCategories;
    });

    if (closeDropdownOnSelect) {
      setIsDropdownOpen(false);
    }
  };

  const removeCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    setShowCategoryCard(false);
  };

  const uploadImageToCloudinary = async(file: File) =>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append ('upload_preset', 'dqsxlntau');
  
    try{
    const response = await fetch(`https://api.cloudinary.com/v1_1/dqsxlntau/image/upload`,{
      method: 'POST',
      body: formData,
    });
  
    if(!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary');
    }
  
    const data= await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error al subir la imagem a Cloudinary', error);
    throw error;
  }
   };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      try{
        const imageUrl = await uploadImageToCloudinary(file);
        setImagePreview(imageUrl);
      } catch (error) {
        console.error('Error al subir la imagen a Cloudinary', error)
      }
    }
  };

  const handleSubmitForm = async (data: any) => {
    data.price = parseFloat(data.price);
    data.category = selectedCategories;
    console.log('handleSubmitForm llamado con datos:', data);

    if(imageFile) {
    onSubmit(data, imageFile); 
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="items-center min-h-screen">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
        <div className="col-span-1 md:col-span-2 mb-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-auto mb-2 rounded-lg shadow-lg" />
          ) : defaultValues?.image ? (
            <img src={defaultValues.image} alt="Product Image" className="w-full h-auto mb-2 rounded-lg shadow-lg" />
          ) : null}
          <label className="block text-grey-500 font-bold">Imagen (Archivo)</label>
          <div className="flex items-center">
            <input
              type="file"
              {...register("image")}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {errors.image && <div className="text-red-500">{errors.image.message?.toString()}</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-gray-500 font-bold">Nombre</label>
          <input
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.name && <div className="text-red-500">{errors.name.message?.toString()}</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-grey-500 font-bold">Descripción</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.description && <div className="text-red-500">{errors.description.message?.toString()}</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-grey-500 font-bold">Precio</label>
          <input
            type="number"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.price && <div className="text-red-500">{errors.price.message?.toString()}</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-grey-500 font-bold">Stock</label>
          <input
            type="number"
            {...register("stock")}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.stock && <div className="text-red-500">{errors.stock.message?.toString()}</div>}
        </div>
        <div className="col-span-1 mb-4 relative" ref={dropdownRef}>
          <label className="block text-gray-500 font-bold">Categorías</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-white flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Seleccionar categorías
              <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                V
              </span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedCategories.includes(category.id) ? 'bg-gray-200' : ''
                    }`}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((cat) => cat.id === categoryId);
              return (
                <div key={categoryId} className="p-2 bg-gray-200 rounded-lg flex items-center">
                  {category?.name}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeCategory(categoryId)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          {errors.category && <div className="text-red-500">{errors.category.message?.toString()}</div>}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
          >
            {isEditMode ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

