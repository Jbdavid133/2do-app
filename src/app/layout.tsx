'use client';

import './globals.css';
import {WixDesignSystemProvider} from '@wix/design-system';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang='en'>
        <head>
            <title>2Do</title>
        </head>
        <body>
        <WixDesignSystemProvider>
            {children}
        </WixDesignSystemProvider>
        </body>
        </html>
    );
}
