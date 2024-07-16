'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPage = 'Chily';
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
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
    <>
      <nav className="relative top-0 left-0 right-0 bg-red-500 text-white p-4 z-50">
        <div className="container flex justify-between items-center">
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

                {user?.role === 'admin' || user?.role === 'superadmin' ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="hover:text-gray-300"
                    >
                      Panel {dropdownOpen ? '▲' : '▼'}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-red-500 text-white rounded-md border shadow-lg z-20">
                        <Link
                          href="/admin-history"
                          className="block p-2 hover:text-gray-700"
                        >
                          Panel Ordenes
                        </Link>
                        <Link
                          href="/superadmin/products"
                          className="block p-2 hover:text-gray-700"
                        >
                          Menu Products
                        </Link>
                        {user?.role === 'superadmin' && (
                          <>
                          <Link href="/cupons" className='block p-2 hover:text-gray-700'>
                          Cupones descuento
                          </Link>
                            <Link
                              href="/superadmin/categories"
                              className="block p-2 hover:text-gray-700"
                            >
                              Categorias
                            </Link>
                            <Link
                              href="/superadmin/dashboard"
                              className="block p-2 hover:text-gray-700"
                            >
                              Dashboard
                            </Link>
                            <Link
                              href="/adminaccounts"
                              className="block p-2 hover:text-gray-700"
                            >
                              Accounts
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left p-2 hover:text-gray-700"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="hover:text-gray-300"
                    >
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
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-300">
                  Iniciar sesión
                </Link>
                <Link href="/register" className="hover:text-gray-300">
                  Registrarme
                </Link>
              </>
            )}
          </div>

          <div className="xl:hidden flex relative" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="relative left-0 right-0 bg-red-500 text-white p-4 z-10 w-full md:w-4/5 mx-auto rounded-xl border-2 shadow-lg">
          <Link href="/" className="block p-2 hover:text-gray-300">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile" className="block p-2 hover:text-gray-300">
                Mi perfil
              </Link>

              {user?.role === 'admin' || user?.role === 'superadmin' ? (
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="block w-full text-left p-2 hover:text-gray-300"
                  >
                    Panel {dropdownOpen ? '▲' : '▼'}
                  </button>
                  {dropdownOpen && (
                    <div className="pl-4">
                      <Link
                        href="/admin-history"
                        className="block p-2 hover:text-gray-700"
                      >
                        Panel Ordenes
                      </Link>
                      <Link
                        href="/superadmin/products"
                        className="block p-2 hover:text-gray-700"
                      >
                        Menu Products
                      </Link>
                      {user?.role === 'superadmin' && (
                        <>
                          <Link
                            href="/superadmin/dashboard"
                            className="block p-2 hover:text-gray-700"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/superadmin/categories"
                            className="block p-2 hover:text-gray-700"
                          >
                            Categorias
                          </Link>
                          <Link
                            href="/cupons"
                            className="block p-2 hover:text-gray-700"
                          >
                            Cupones
                          </Link>
                          <Link
                            href="/adminaccounts"
                            className="block p-2 hover:text-gray-700"
                          >
                            Accounts
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left p-2 hover:text-gray-300"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-2 hover:text-gray-300"
                  >
                    Cerrar sesión
                  </button>
                  <Link
                    href="/cart"
                    className="block p-2 hover:text-gray-300"
                    onClick={handleCartClick}
                  >
                    <AiOutlineShoppingCart className="text-2xl" />
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="block p-2 hover:text-gray-300">
                Iniciar sesión
              </Link>
              <Link href="/register" className="block p-2 hover:text-gray-300">
                Registrarme
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};
