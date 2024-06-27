'use client'
import React, {useEffect, useState} from 'react';
import UserInfo  from '../components/ProfileComponents/UserInfo';
//import {useAuth} from '../contexts/AuthContext';

//para harcodear

type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
} | null


const UserDashboard: React.FC = () => {

  //const {user} = useAuth();

  const [user, setUser] = useState<User>(null);

  useEffect(()=> {

    const fetchedUser ={ 
      name: 'Juan Perez',
      email: 'juanperez@example.com',
      phone: '1234567890',
      address:'fake st 1234',
      password: '********'
    };

    setUser(fetchedUser);

  }, []);



  return(
    <div className="min-h-screen flex justify-center items-center bg-white w-full h-full">
      {user !== null? (
        <UserInfo user={user} />
      ):(
        <div className="text-center mt-20"> Cargando...</div>
      )}
    </div>
  );
};

export default UserDashboard;