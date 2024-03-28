'use client';

import {createContext, ReactNode, useEffect} from 'react';
import {LocalStorageKey} from '@/app/constants';
import {redirect, usePathname} from 'next/navigation';
import {useStorage} from '@/app/hooks/useStorage/useStorage';
import isNil from 'lodash/isNil';

interface AuthenticationState {
    username: string | undefined;
    login: (username: string) => void;
    logout: () => void;
}

const initialState: AuthenticationState = {
    username: undefined,
    logout: () => {
    },
    login: () => {
    }
};

export const AuthenticationContext = createContext<AuthenticationState>(initialState);

export const AuthenticationContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const pathname = usePathname();
    const usernameFromStorage = useStorage<string>(LocalStorageKey.USERNAME);

    useEffect(() => {
        if (usernameFromStorage.isInitialized) {
            if (pathname === '/') {
                usernameFromStorage.removeValue();
            } else if (isNil(usernameFromStorage.value)) {
                redirect('/');
            }
        }
    }, [pathname, usernameFromStorage.isInitialized]);

    const login = (username: string) => usernameFromStorage.setValue(username);

    const logout = () => {
        usernameFromStorage.removeValue();
        redirect('/');
    };

    return <AuthenticationContext.Provider value={{username: usernameFromStorage.value, logout, login}}>
        {props.children}
    </AuthenticationContext.Provider>;
};