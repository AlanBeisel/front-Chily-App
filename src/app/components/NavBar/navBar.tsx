'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/contexts/AuthContext'; 

const pageNames: { [key: string]: string } = {
  '/home': 'Home',
  '/menu': 'Menu',
  '/profile': 'Mi Perfil',
  '/login': 'Iniciar Sesión',
  '/register': 'Registrarme',
  '/cart': 'Carrito',
};

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pageNames[pathname] || 'Chily';
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };


  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();

      toast.warn('Debes iniciar sesión para acceder al carrito.', {
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


  return (
    <nav className="bg-red-500 text-white p-4 sm:p-6 rounded-xl m-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/LogoLay.png"
            alt="Chily"
            id="logo"
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl"
            width={500}
            height={500}
          />
          <a href="/" className="text-4xl font-bold">
            {currentPage}
          </a>
        </div>

        <div className="hidden xl:flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">
                Mi perfil
              </Link>

              {user?.role === 'admin' || user?.role === 'superAdmin'  && (
                <Link href="/admin-panel" className="hover:text-gray-300">
                  Panel Ordenes
                </Link>
              )}
              {user?.role === 'superAdmin' && (
                
                <Link href="/menu-panel" className="hover:text-gray-300">
                  Menu Products
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-gray-300">
                Cerrar sesión
              </button>
              <Link
                href="/cart"
                className="hover:text-gray-300"
                onClick={handleCartClick}
              >
                <AiOutlineShoppingCart className="text-2xl" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="#"
                className="hover:text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/login');
                }}
              >
                Iniciar sesión
              </Link>
              <Link
                href="#"
                className="hover:text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/register');
                }}
              >
                Registrarme
              </Link>
            </>
          )}
        </div>

        <div className="xl:hidden flex relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {menuOpen && (
            <div className="fixed top-32 left-16 right-0 bg-red-500 text-white p-4 z-10 w-9/12 mx-4 rounded-xl border-2">
              <Link href="/" className="block p-2 hover:text-gray-300">
                Home
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block p-2 hover:text-gray-300"
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block p-2 hover:text-gray-300"
                  >
                    Cerrar sesión
                  </button>

                  {user?.role === 'admin' && (
                    <Link
                      href="/admin-panel"
                      className="block p-2 hover:text-gray-300"
                    >
                      Panel Administrador
                    </Link>
                  )}
                  {user?.role === 'superAdmin' && (
                    <Link
                      href="/menu-panel"
                      className="block p-2 hover:text-gray-300"
                    >
                      Panel Menu
                    </Link>
                  )}
                  <Link
                    href="/cart"
                    className="block p-2 hover:text-gray-300"
                    onClick={handleCartClick}
                  >
                    <AiOutlineShoppingCart className="text-2xl" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="#"
                    className="block p-2 hover:text-gray-300"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/login');
                    }}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="#"
                    className="block p-2 hover:text-gray-300"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/register');
                    }}
                  >
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
