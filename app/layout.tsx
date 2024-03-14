import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Oanse Dashboard',
    default: 'Oanse'
  },
  description: 'O site criado para auxiliar os diretores Oanse.',
  metadataBase: new URL('https://www.instagram.com/oansebrasil/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}