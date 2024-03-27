import {createContext, ReactNode, useEffect, useState} from 'react';
import {SessionStorageKey} from '@/app/constants';
import {redirect, RedirectType, usePathname} from 'next/navigation';
import isNil from 'lodash/isNil';

interface AuthenticationState {
    isInitialized: boolean;
    username: string | null;
    setUsername: (username: AuthenticationState['username']) => void;
}

const initialState: AuthenticationState = {
    username: null,
    isInitialized: false,
    setUsername: () => {
    },
};

export const AuthenticationContext = createContext<AuthenticationState>(initialState);

export const AuthenticationContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const pathname = usePathname();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [username, setUsername] = useState<AuthenticationState['username']>(null);

    useEffect(() => {
        setUsername(sessionStorage.getItem(SessionStorageKey.USERNAME));
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            if (isNil(username)) {
                sessionStorage.removeItem(SessionStorageKey.USERNAME);

                if (pathname !== '/') {
                    redirect('/', RedirectType.replace);
                }
            } else if (!isNil(username)) {
                sessionStorage.setItem(SessionStorageKey.USERNAME, username);
            }
        }
    }, [isInitialized, pathname, username]);

    return <AuthenticationContext.Provider value={{username, setUsername, isInitialized}}>
        {props.children}
    </AuthenticationContext.Provider>;
};