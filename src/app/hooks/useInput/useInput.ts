import isNil from 'lodash/isNil';
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';
import {ChangeEvent, useEffect, useState} from 'react';

interface UserInputHookProps<T> {
    validators?: ((inputValue: T | undefined) => Record<string, string> | null)[];
}

export const useInput = <T>(props?: UserInputHookProps<T>) => {
    const [inputValue, setInputValue] = useState<T>();
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<Boolean | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isTouched && !isNil(props?.validators) && !isEmpty(props.validators)) {
            const validatorsErrors = props.validators.map(validator => validator(inputValue)).filter(Boolean);

            setErrors(assign({}, ...validatorsErrors));
        }
    }, [inputValue, isTouched]);

    useEffect(() => {
        setIsValid(isEmpty(errors));
    }, [errors]);

    const onChange = ($event: ChangeEvent<HTMLInputElement>) => {
        setInputValue($event.target.value.trim() as T);
    };

    const onBlur = () => {
        setIsTouched(true);
    };

    return {
        onBlur, onChange, value: inputValue, touched: isTouched, isValid, errors
    };
};

