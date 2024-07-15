import {useState, useEffect} from 'react';
import {updateUser} from '@/helpers/peticionesSuperAdmin';
import { toast } from 'react-toastify';

const EditUserForm = ({userId, userRole, userName, token}) => {
  const [role, setRole] = useState(userRole);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await updateUser(userId, {role}, token);
      toast.success('¡Rol de usuario actualizado correctamente!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al actualizar el rol del usuario', error);
      toast.warn('Hubo un problema al actualizar el rol del usuario. Por Favor, intenta nuevamente.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return(
    <div className="max-w-md mx-auto bg-white p-8 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Editar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Nombre</label>
          <p className="text-sm text-gray-900">{userName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="role">Roll</label>
          <select
          id="role"
          name="role"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={role}
          onChange={handleRoleChange}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div>
          <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;