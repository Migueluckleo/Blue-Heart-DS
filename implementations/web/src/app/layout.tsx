import type { Metadata } from 'next';
import '../styles.css';

export const metadata: Metadata = { title: 'BlueHeart DS · Catálogo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
