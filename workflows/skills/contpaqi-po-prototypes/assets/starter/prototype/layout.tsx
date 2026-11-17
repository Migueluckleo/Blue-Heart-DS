import type { ReactNode } from 'react';
import '../ui/styles.css';
import './globals.css';
import {RuntimeReady} from './runtime-ready';
export const metadata = { title: 'Prototipo BlueHeart' };
export default function RootLayout({children}:{children:ReactNode}) {return <html lang="es"><body>{children}<RuntimeReady/></body></html>;}
