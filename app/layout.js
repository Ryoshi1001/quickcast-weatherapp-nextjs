import "./globals.css";
import localFont from 'next/font/local';
import { Roboto } from "next/font/google";

const montserrat = localFont({
  src: './fonts/Montserrat-VariableFont_wght.ttf', 
  variable: '--font-montserrat',
  weight: '100 200 300 400 500 600 700 800 900',
  display: 'swap' 
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
});


export const metadata = {
  title: "QuickCast",
  description: "Your Instant Weather Update",
  
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
