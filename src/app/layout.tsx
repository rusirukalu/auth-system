import { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { Toaster } from 'sonner';
import { AuthListener } from '@/components/auth/AuthListener';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CITADEL | Secure Identity Management',
  description:
    'Next-generation identity management infrastructure built for absolute security.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${jetbrainsMono.className} bg-[#0a0a0a] text-white`}>
        <ReduxProvider>
          <AuthListener />
          {children}
          <Toaster theme="dark" />
        </ReduxProvider>
      </body>
    </html>
  );
}
