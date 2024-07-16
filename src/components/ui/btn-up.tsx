'use client';
import { useEffect, useState } from 'react';

const BtnUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando se haya hecho scroll hacia abajo 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          ↑
        </button>
      )}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }

        .scroll-to-top-button {
          background-color: #f44336; /* Color rojo */
          color: white;
          border: none;
          border-radius: 50%;
          padding: 10px 15px;
          cursor: pointer;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
          transition: opacity 0.3s ease-in-out;
        }

        .scroll-to-top-button:hover {
          background-color: #d32f2f; /* Color rojo oscuro para hover */
        }
      `}</style>
    </div>
  );
};

export default BtnUp;
