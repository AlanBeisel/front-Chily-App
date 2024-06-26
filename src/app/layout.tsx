import type { Metadata } from 'next';
import { Poppins, Mochiy_Pop_One } from 'next/font/google';
import './globals.css';
import Footer from './components/footer/footer';
import { Navbar } from './components/NavBar/navBar';
import { AuthProvider } from './contexts/AuthContext';

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
        className={`${mochily.className} ${poppins.className} w-full flex justify-center`}
      >
        <AuthProvider>
          {/* <div className="w-10/12 md:w-8/12 lg:w-7/12"> ESTO HAGAMOSLO EN CADA PAGE, Deberiamos usar un contenedor de max width en cada page */}
          <Navbar />
          {children}
          <Footer />
          {/* </div> */}
        </AuthProvider>
      </body>
    </html>
  );
}
