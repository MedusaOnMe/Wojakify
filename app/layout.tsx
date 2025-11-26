import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WOJAKIFY',
  description: 'Transform any image into a Wojak meme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
