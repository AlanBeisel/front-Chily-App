'use client';
import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';
import { FiArrowLeft } from 'react-icons/fi';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

const ProfileAdmin: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
  };

  return (
    <div className="flex flex-col max-w-[320px] h-full profile-admin">
      <div className="flex items-center w-full h-full ">
        <Link className="bg-white text-white" href="/login">
          <a className=" text-red-700 hover:text-red-500">
            <FiArrowLeft />
          </a>
        </Link>
        <h1 className=" text-red-600">Perfil</h1>
      </div>
      <form>
        <div className="form-group">
          <label>Nombre</label>
          <Input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <Input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <Input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <Input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <Input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Button onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAdmin;
