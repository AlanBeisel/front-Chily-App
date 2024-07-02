import React from 'react';
import Head from 'next/head';
import MenuNavigation from '../components/MenuNavigation/MenuNavigation';
//import { useAuth } from '../contexts/AuthContext';


const UserMenu = () => {

 // const {isAuthenticated} = useAuth();


  //if(!isAuthenticated) {
    //return <p> Debes iniciar sesión para acceder a esta pagina.</p>
 // }

  
  return( 
    <div className="flex justify-center items-center min-h-screen bg-white w-full">
      <Head>
        <title>Perfil</title>
      </Head>
      <MenuNavigation/>
    </div>
  );
};

export default UserMenu;
