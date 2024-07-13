'use client'
import {z} from 'zod';
import {useState} from 'react';
import { showToast } from '@/lib/utils';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const passwordSchema = z.string()
.min(8, "La contraseña debe tener al menos 8 caracteres")
.regex(/[a-z]/, "La contraseña debe tener al menos una letra minúcula")
.regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayuscula")
.regex(/[0-9]/, "La contraseña debe tener al menos un número");

const formSchema = z.object ({
  userId: z.number(),
  oldPassword: z.string(),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
 }).refine((data)=> {
    return data.newPassword == data.confirmPassword;
 }, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
      });

function ChangePasswordForm () {
  const [formData, setFormData] = useState({
    userId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange =(e: { target: { name: string; value: string; }; }) => {
  const{name,value} = e.target;
    setFormData({...formData, [name]: value});
};


const toggleShowNewPassword = () => {
  setShowNewPassword((prev) => !prev);
};

const toggleShowConfirmPassword = () => {
  setShowConfirmPassword((prev) => !prev);
};


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);

      const parsedData = formSchema.safeParse({
        ...formData,
        userId: Number(formData.userId),
      });

      if(!parsedData.success) {
        const newErrors: Record<string, string> = {};
        parsedData.error.errors.forEach((error) =>{
          if (error.path.length > 0 && typeof error.path[0] === 'string') {
            newErrors[error.path[0]] = error.message;
          }
        });
        setErrors(newErrors);
        console.log('Validation error:', parsedData.error.errors);
        showToast('error', <p>Hubo un problema al cambiar la contraseña.</p>);
        setSubmitting(false);
        return;
      }

      setErrors({});

    
    try{
      const response = await fetch(`${API_URL}/auth/password`, {
        method:'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(parsedData.data),
      });

      if (response.ok){
        console.log('Contraseña cambiada correctamente');
        showToast('success', <p>Contraseña cambiada correctamente.</p>);
      } else {
        console.log('Hubo un problema al cambiar la contraseña');
        showToast('error', <p>Hubo un problema al cambiar la contraseña</p>);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      showToast('error', <p>Hubo un problema al cambiar la contraseña.</p>)
    } finally {
      setSubmitting(false);
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-red-500">
    <form onSubmit={handleSubmit} className=" flex flex-col items-center mt-10 bg-white rounded-lg shadow-lg p-8 w-96 h-96">
    <h2 className="text-2xl font-bold mb-4 text-red-500">Cambiar contraseña</h2>
    <div className="mb-4">
      <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
        Contraseña anterior
      </label>
      <input
        type="password"
        id="oldPassword"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.oldPassword && <p className="mt-2 text-sm text-red-600">{errors.oldPassword}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
        Nueva contraseña
      </label>
      <div className="relative">
      <input
        type={showNewPassword ? "text" : "password"}
        id="newPassword"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button type= "button" onClick={toggleShowNewPassword} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 focus:outline-none">
      {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye/>}
      </button>
      </div>
      {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirmar contraseña
      </label>
      <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
       <button type= "button" onClick={toggleShowConfirmPassword} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 focus:outline-none">
      {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye/>}
      </button>
      </div>
      {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
    </div>

    <button
      type="submit"
      className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
      disabled={submitting}
    >
      {submitting ? 'Enviando...' : 'Cambiar contraseña'}
      </button>
    </form>
    </div>
  );
};


export default ChangePasswordForm;