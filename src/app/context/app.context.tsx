import {createContext, ReactNode, useEffect, useState} from 'react';
import {isNil} from 'lodash';

interface AppState {
    username: string | undefined;
    setUsername: (username: string) => void;
}

const initialState: AppState = {
    username: undefined,
    setUsername: () => {
    },
};

export const AppContext = createContext<AppState>(initialState);

export const AppContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loggedUserDataString = localStorage.getItem('loggedUser');

        if (!isNil(loggedUserDataString)) {
            const loggedUserData: { username: string } = JSON.parse(loggedUserDataString);

            setUsername(loggedUserData.username);
        }
    }, []);

    return <AppContext.Provider value={{username, setUsername}}>
        {props.children}
    </AppContext.Provider>;
};