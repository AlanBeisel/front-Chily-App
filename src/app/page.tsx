"use client"
import { Popular } from '../app/components/HomeComponents/Popular';
import { CategoryFilter } from '../app/components/MenuComponents/CategoryFilter';
import Horarios from './components/HomeComponents/Horarios';
import { RenderCategory } from './components/HomeComponents/RenderCategory';
import {useEffect, useState} from 'react'
import { IoIosArrowUp } from 'react-icons/io';


export default function Home() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <div className="w-full flex justify-center">
        <main className="w-full flex-grow p-4">
          <CategoryFilter />
          <Horarios />
          <Popular />
          <RenderCategory />
          {showScrollTopButton && (
            <button
              className="fixed bottom-8 right-8 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
              onClick={scrollToTop}
            >
              <IoIosArrowUp className="text-2xl" />
            </button>
          )}
        </main>
      </div>
    </>
  );
}
