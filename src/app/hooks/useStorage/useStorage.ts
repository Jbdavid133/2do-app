import {useEffect, useState} from 'react';
import isNil from 'lodash/isNil';

export const useStorage = <T>(key: string) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [value, setValue] = useState<T>();

    useEffect(() => {
        if (!isInitialized) {
            const valueJsonString = localStorage.getItem(key);

            try {
                isNil(valueJsonString) ? setValue(undefined) : setValue(JSON.parse(valueJsonString));
            } catch (error) {
                setValue(undefined);
            }

            setIsInitialized(true);
        }
    }, [key, isInitialized]);

    useEffect(() => {
        if (isInitialized && !isNil(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [isInitialized, key, value]);

    const removeValue = () => {
        localStorage.removeItem(key);
        setValue(undefined);
    };

    return {isInitialized, value, setValue, removeValue};
};