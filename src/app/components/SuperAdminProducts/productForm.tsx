import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategories } from '@/helpers/peticiones';

type Category = {
  id: number;
  name: string;
};

type ProductFormProps = {
  defaultValues?: any;
  onSubmit: (data: any, imageURL?: string) => void;
  isEditMode?: boolean;
  closeDropdownOnSelect?: boolean;
};

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
  isEditMode,
  closeDropdownOnSelect = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    defaultValues?.category?.map((cat: any) => cat?.id) || [],
  );
  const [, setShowCategoryCard] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.imageURL || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [, setIsSubmitting] = useState(false);

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
      setSelectedCategories(
        defaultValues.category
          .filter((cat: any) => cat !== null)
          .map((cat: any) => cat.id),
      );
    }
  }, [defaultValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories.includes(categoryId)) {
        return [...prevCategories, categoryId];
      }
      return prevCategories;
    });

    if (closeDropdownOnSelect) {
      setIsDropdownOpen(false);
    }
  };

  const removeCategory = (categoryId: number) => {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    setShowCategoryCard(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `Error al subir la imagen al backend: ${errorResponse.message}`,
          );
        }

        const data = await response.json();
        console.log('Respuesta del backend:', data);
        setImagePreview(null);
        setImageFile(null);
        return data.secure_url;
      } catch (error) {
        console.error('Error al subir la imagen al backend', error);
        throw error;
      }
    }
    return null;
  };

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);

    data.category = selectedCategories.map((categoryId) => categoryId);
    console.log('handleSubmitForm llamado con datos:', data);

    try {
      data.price = parseFloat(data.price);
      data.stock = parseInt(data.stock);

      let imageURL = null;
      if (imageFile) {
        imageURL = await handleImageUpload();
      }
      onSubmit(data, imageURL);
      setIsSubmitting(false);
      reset();
      setImagePreview(null);
      setImageFile(null);
      setSelectedCategories([]);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="items-center min-h-screen">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-xl max-w-4xl mx-auto"
      >
        <div className="col-span-1 md:col-span-2 mb-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-80 h-auto mb-2 rounded-lg shadow-lg"
            />
          ) : defaultValues?.imageURL ? (
            <img
              src={defaultValues.imageURL}
              alt="Product Image"
              className="w-80 h-auto mb-2 rounded-lg shadow-lg"
            />
          ) : null}
          <label className="block text-gray-500 font-bold">
            Imagen (Archivo)
          </label>
          <div className="flex items-center">
            <input
              type="file"
              {...register('imageURL')}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border border-gray-500 rounded-lg shadow-sm"
            />
          </div>
          {errors.imageURL && (
            <div className="text-red-500">Error en la imagen</div>
          )}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-gray-500 font-bold">Nombre</label>
          <input
            {...register('name', { required: 'Nombre es requerido' })}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.name && <div className="text-red-500">Nombre invalido</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-gray-500 font-bold">Descripción</label>
          <textarea
            {...register('description', {
              required: 'Descripción es requerida',
            })}
            className="w-full p-2 border border-gray-500 rounded-lg shadow-sm"
          />
          {errors.description && (
            <div className="text-red-500">Descripcion invalida</div>
          )}
        </div>
        <div className="col-span-1 mb-4">
          <label htmlFor="price" className="block text-gray-500 font-bold">
            Precio
          </label>
          <input
            type="text  "
            id="price"
            {...register('price', {
              required: 'El precio es requerido',
              valueAsNumber: true,
              validate: (value) =>
                value > 0 || 'El precio debe ser un número positivo',
            })}
            className="w-full p-2 border border-gray-500 rounded-lg shadow-sm"
          />
          {errors.price && <div className="text-red-500">Precio invalido</div>}
        </div>
        <div className="col-span-1 mb-4">
          <label htmlFor="stock" className="block text-gray-500 font-bold">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            {...register('stock', {
              required: 'El stock es requerido',
              valueAsNumber: true,
              validate: (value) =>
                value >= 0 || 'El stock debe ser un número entero no negativo',
            })}
            className="w-full p-2 border border-gray-500 rounded-lg shadow-sm"
          />
          {errors.stock && <div className="text-red-500">Stock inválido</div>}
        </div>
        <div className="col-span-1 mb-4 relative" ref={dropdownRef}>
          <label className="block text-gray-500 font-bold">Categorías</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-2 border border-gray-500 rounded-lg shadow-sm bg-white flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Seleccionar categorías
              <span
                className={`transform transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              >
              V
              </span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full border border-gray-500 rounded-lg shadow-lg bg-white mt-2">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-500 font-bold">
            Categorías seleccionadas
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((cat) => cat.id === categoryId);
              return category ? (
                <div
                  key={category.id}
                  className="px-4 py-2 bg-white rounded-full shadow-lg flex items-center"
                >
                  <span className="mr-2">{category.name}</span>
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => removeCategory(category.id)}
                  >
                    X
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600"
          >
            {isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
