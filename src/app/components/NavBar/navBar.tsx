'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import { useRouter, usePathname } from 'next/navigation';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pageNames[pathname] || 'Chily';

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    setIsAuthenticated(!!userSession);
  }, []);

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
    localStorage.removeItem('userSession');
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();

      // toast.warn('Debes iniciar sesión para acceder al carrito.', {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      // });
    }
  };

  return (
    <nav className="bg-red-400 text-white p-4 sm:p-6 rounded-xl m-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://scontent.fros2-2.fna.fbcdn.net/v/t39.30808-6/294605266_729767591661554_8943081080553740766_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEVsd0dE5OTtBR8r2flSEeDV9_OOF-Ig9FX3844X4iD0UCeM0I6IR_iUgEjVa3NBviwAD54R6K_E-wx19-lNgJc&_nc_ohc=bpg8Kf7YInAQ7kNvgHxk-s6&_nc_ht=scontent.fros2-2.fna&oh=00_AYCrlMBn2yCB3rWVKWKJeV2C2fjzHyZh5WIqfkS8oVagGg&oe=66791FC6"
            alt="Chily"
            id="logo"
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mr-4 rounded-xl"
          />
          <a href="/home" className="text-4xl font-bold">
            {currentPage}
          </a>
        </div>

        <div className="hidden xl:flex items-center space-x-4">
          <Link href="/home" className="hover:text-gray-300">
            Home
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className="hover:text-gray-300">
              Mi perfil
            </Link>
          ) : (
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
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Cerrar sesión
            </button>
          ) : (
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
          )}

          <Link
            href="/cart"
            className="hover:text-gray-300"
            onClick={handleCartClick}
          >
            <AiOutlineShoppingCart className="text-2xl" />
          </Link>
        </div>

        <div className="xl:hidden flex relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {menuOpen && (
            <div className="fixed top-32 left-0 right-0 bg-red-400 text-white p-4 z-10 w-[calc(100%-2rem)] mx-4 rounded-xl">
              <Link href="/home" className="block p-2 hover:text-gray-300">
                Home
              </Link>

              {isAuthenticated ? (
                <Link href="/profile" className="block p-2 hover:text-gray-300">
                  Mi perfil
                </Link>
              ) : (
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
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block p-2 hover:text-gray-300"
                >
                  Cerrar sesión
                </button>
              ) : (
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
              )}

              <Link
                href="/cart"
                className="block p-2 hover:text-gray-300"
                onClick={handleCartClick}
              >
                <AiOutlineShoppingCart className="text-2xl" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
