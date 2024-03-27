'use client';

import './globals.css';
import '@wix/design-system/styles.global.css';
import {WixDesignSystemProvider} from '@wix/design-system';
import {AuthenticationContextProvider} from '@/app/context/authentication.context';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang='en'>
        <head>
            <title>2Do</title>
        </head>
        <body>
        <AuthenticationContextProvider>
            <WixDesignSystemProvider>
                {children}
            </WixDesignSystemProvider>
        </AuthenticationContextProvider>
        </body>
        </html>
    );
}
