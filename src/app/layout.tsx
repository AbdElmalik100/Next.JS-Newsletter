'use client'
import { AppWrapper } from '@/context';
import './globals.scss'
import { Toaster } from "sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
        <Toaster richColors position="top-right" />

      </body>
    </html>
  );
}
