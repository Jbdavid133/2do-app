import {ChangeEvent, FocusEvent, useEffect, useState} from 'react';
import {Dictionary, isEmpty, isNil, merge} from 'lodash';

interface UserInputHookProps<T> {
    validators?: ((inputValue: T | undefined) => Dictionary<string> | null)[];
}

export const useInput = <T>(props?: UserInputHookProps<T>) => {
    const [inputValue, setInputValue] = useState<T>();
    const [touched, setTouched] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<Boolean | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (touched && !isNil(props?.validators) && !isEmpty(props.validators)) {
            const validatorsErrors = props.validators.map(validator => validator(inputValue)).filter(Boolean);

            setErrors(merge({}, ...validatorsErrors));
        }
    }, [inputValue, touched]);

    useEffect(() => {
        setIsValid(isEmpty(errors));
    }, [errors]);

    const onChange = ($event: ChangeEvent<HTMLInputElement>) => {
        setInputValue($event.target.value.trim() as T);
    };

    const onBlur = (_: FocusEvent<HTMLInputElement>) => {
        setTouched(true);
    };

    return {
        onBlur, onChange, value: inputValue, touched, isValid, errors
    };
};

