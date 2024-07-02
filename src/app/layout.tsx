import type { Metadata } from 'next';
import { Poppins, Mochiy_Pop_One } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/footer';
import { Navbar } from './components/NavBar/navBar';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { CacheProvider } from './contexts/CacheContext';

const mochily = Mochiy_Pop_One({ weight: '400', subsets: ['latin'] });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Donde chily',
  description: 'Donde chily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="flex flex-col w-full justify-center items-center"
    >
      <body
        className={`${mochily.className} ${poppins.className} flex justify-center max-w-7xl flex-col w-full p-4 max-lg:p-0 `}
      >
        <AuthProvider>
          <CacheProvider>
            <ToastContainer />
            <Navbar />
            {children}
            <Footer />
          </CacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
