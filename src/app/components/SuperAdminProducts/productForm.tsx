import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAllCategories } from '@/helpers/peticiones';

const ProductData = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().min(1, 'Descripción es requerida'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'El precio debe ser un número válido con hasta dos decimales').refine(value => parseFloat(value) > 0, { message: 'El precio debe ser mayor a 0' }),
  image: z.string().url('Debe ser una URL válida').optional(),
  category: z.array(z.string()).min(1, 'Debe seleccionar al menos una categoría'),
});

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  closeDropdownOnSelect?: boolean;
};

const ProductForm: React.FC<ProductFormProps> = ({ defaultValues, onSubmit, isEditMode, closeDropdownOnSelect = false}) => {
  const {register, handleSubmit, formState: {errors} } = useForm ({
    resolver: zodResolver(ProductData),
    defaultValues,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultValues?.category || []);
  const [, setShowCategoryCard] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.image || null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try{
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
    setShowCategoryCard(false)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (data: any) => {
    console.log('handleSubmitForm llamado con datos:', data);
    onSubmit(data); 
  };

  return(
    <div className="items-center min-h-screen">
    <form onSubmit = {handleSubmit(handleSubmitForm)} className = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <div className="col-span-1 md:col-span-2 mb-4">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-auto mb-2 rounded-lg shadow-lg"/>
            ) : defaultValues?.image ? (
            <img src={defaultValues.image} alt="Product Image" className="w-full h-auto mb-2 rounded-lg shadow-lg"/>
            ) : null}
        <label className="block text-grey-500 font-bold">Imagen (URL)</label>
        <div className="flex items-center">
        <input
        type="file"
        {...register ("image")}
        onChange={handleImageChange}
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        {defaultValues?.image && (
          <div className="mb-2">
            <img src={defaultValues.image} alt="Product Image" className="w-32 h-auto mb-2"/>
          </div>
        )}
        </div>
        {errors.image && <div className= "text-red-500">{errors.image.message?.toString()}</div>}
      </div>
      <div className="col-span-1 mb-4">
        <label className="block text-gray-500 font-bold">Nombre</label>
        <input
        {...register("name")}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        {errors.name && <div className= "text-red-500">{errors.name.message?.toString()}</div>}
      </div>
      <div className="col-span-1 mb-4">
        <label className="block text-grey-500 font-bold">Descripción</label>
        <textarea
        {...register ("description")}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        {errors.description && <div className= "text-red-500">{errors.description.message?.toString()}</div>}
      </div>
      <div className="col-span-1 mb-4">
        <label className="block text-grey-500 font-bold">Precio</label>
        <input
        type="text"
        {...register ("price")}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        {errors.price && <div className= "text-red-500">{errors.price.message?.toString()}</div>}
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
            <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg list-none p-0 max-h-40 overflow-y-auto">
              {categories.length === 0 ? (
                <li className="text-gray-500 p-2">No hay categorías disponibles</li>
              ) : (
                categories.map(category => (
                  <li
                    key={category.id}
                    className={`p-2 cursor-pointer rounded-md ${selectedCategories.includes(category.id) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      {selectedCategories.length > 0 && (
  <div className="col-span-1 md:col-span-2 mb-4">
    <label className="block text-gray-700 font-bold">Categorías seleccionadas</label>
    <div className="flex flex-wrap">
      {selectedCategories.map((categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? (
          <div key={categoryId} className="flex items-center mb-2 mr-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {category.name}
            </span>
            <button
              type="button"
              onClick={() => removeCategory(categoryId)}
              className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold focus:outline-none"
            >
              X
            </button>
          </div>
        ) : null;
      })}
    </div>
  </div>
)}

      <div className="col-span-1 md:col-span-2">
      <button type="submit" className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm">
        {isEditMode ? 'Actualizar' : 'Crear'}
      </button>
      </div>
    </form>
  </div>
  );
};

export default ProductForm;
