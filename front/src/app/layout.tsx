import type { Metadata } from "next";
import { Poppins, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";

const mochily = Mochiy_Pop_One({weight: "400", subsets: ["latin"]});
const poppins = Poppins({weight: ["400", "500","600", "700"], subsets: ["latin"]});


export const metadata: Metadata = {
  title: "Donde chily",
  description: "Donde chily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col justify-center items-center">
      <body className={`${mochily.className} ${poppins.className} flex justify-center items-center w-full`}>{children}</body>
    </html>
  );
}
