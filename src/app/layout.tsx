'use client';

import './globals.css';
import {WixDesignSystemProvider} from '@wix/design-system';
import {TopBar} from '@/app/components/TopBar/TopBar';
import {usePathname} from 'next/navigation';
import {AuthenticationContextProvider} from '@/app/context/authentication.context';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const currentPathname = usePathname();
    const showTopBar = currentPathname !== '/';

    const childrenDisplay = () => {
        if (showTopBar) {
            return <div className='routerOutlet'>
                {children}
            </div>;
        }

        return children;
    };
    return (
        <html lang='en'>
        <head>
            <title>2Do</title>
        </head>
        <body>
        <AuthenticationContextProvider>
            <WixDesignSystemProvider>
                {showTopBar && <TopBar/>}
                {childrenDisplay()}
            </WixDesignSystemProvider>
        </AuthenticationContextProvider>
        </body>
        </html>
    );
}
