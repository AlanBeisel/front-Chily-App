import type { Metadata } from 'next';
import { Poppins, Mochiy_Pop_One } from 'next/font/google';
import './globals.css';
import Footer from './components/footer/footer';
import { Navbar } from './components/NavBar/navBar';
import { AuthProvider } from './contexts/AuthContext';
import { CacheProvider } from './contexts/CacheContext';
import ToastProvider from './contexts/ToastProvider';
import ReactQueryProvider from './contexts/ReactQueryProvider';
import ChatBot from '@/components/ui/chatbot';



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
        className={`${mochily.className} ${poppins.className} flex justify-center max-w-7xl flex-col w-full p-4 max-lg:p-0  `}
      >
        <AuthProvider>
          <CacheProvider>
            <Navbar />
            <ReactQueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </ReactQueryProvider>
            <Footer />
          </CacheProvider>
        </AuthProvider>
         <ChatBot/>;
      </body>
    </html>
  );
}
