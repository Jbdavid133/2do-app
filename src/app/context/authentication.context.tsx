'use client';

import {createContext, ReactNode, useEffect} from 'react';
import {LocalStorageKey, Routes} from '@/app/constants';
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
    const usernameFromStorage = useStorage<string>(LocalStorageKey.Username);

    useEffect(() => {
        if (usernameFromStorage.isInitialized) {
            if (pathname === Routes.Welcome) {
                usernameFromStorage.removeValue();
            } else if (isNil(usernameFromStorage.value)) {
                redirect(Routes.Welcome);
            }
        }
    }, [pathname, usernameFromStorage.isInitialized]);

    const login = (username: string) => usernameFromStorage.setValue(username);

    const logout = () => {
        usernameFromStorage.removeValue();
        redirect(Routes.Welcome);
    };

    return <AuthenticationContext.Provider value={{username: usernameFromStorage.value, logout, login}}>
        {props.children}
    </AuthenticationContext.Provider>;
};