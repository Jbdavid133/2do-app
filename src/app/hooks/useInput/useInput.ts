import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {Dictionary} from 'lodash';
import {Validator} from '@/app/hooks/useInput/validators';

interface UserInputHookProps {
    validators?: Validator[];
}

export interface UseInputHook {
    isTouched: boolean,
    value: string | undefined,
    isValid: boolean | null,
    errors: Dictionary<string>
    onTouch: () => void,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void

}

export const useInput = (props?: UserInputHookProps): UseInputHook => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useMemo(() => setIsValid(isEmpty(errors)), [errors]);

    useEffect(() => {
        if ((isTouched || !isNil(inputValue)) && !isNil(props?.validators) && !isEmpty(props.validators)) {
            const validatorsErrors = props.validators.map(validator => validator(inputValue)).filter(Boolean);

            setErrors(Object.assign({}, ...validatorsErrors));
        }
    }, [inputValue, isTouched]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };

    const onTouch = () => {
        setIsTouched(true);
    };

    return {
        onTouch, onChange, value: inputValue, isTouched, isValid, errors
    };
};

