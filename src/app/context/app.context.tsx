import {createContext, ReactNode, useEffect, useState} from 'react';
import {isNil} from 'lodash';

interface AppState {
    isLoggedIn: boolean;
    username: string | undefined;
    setUsername: (username: string) => void;
}

const initialState: AppState = {
    isLoggedIn: false,
    username: undefined,
    setUsername: () => {
    },
};

export const AppContext = createContext<AppState>(initialState);

export const AppContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loggedUserDataString = localStorage.getItem('loggedUser');

        if (!isNil(loggedUserDataString)) {
            const loggedUserData: { username: string } = JSON.parse(loggedUserDataString);

            setUsername(loggedUserData.username);
        }
    }, []);

    useEffect(() => setIsLoggedIn(!isNil(username)), [username]);

    return <AppContext.Provider value={{username, isLoggedIn, setUsername}}>
        {props.children}
    </AppContext.Provider>;
};