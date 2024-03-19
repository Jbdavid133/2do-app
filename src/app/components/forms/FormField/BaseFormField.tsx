import {FormField, FormFieldProps, Input, InputProps} from '@wix/design-system';
import React from 'react';
import {Validator} from '@/app/hooks/useInput/validators';
import {UseInputHook} from '@/app/hooks/useInput/useInput';

interface BaseFormFieldProps<T> extends Pick<FormFieldProps, 'labelId'>,
    Pick<InputProps, 'border' | 'size' | 'type' | 'placeholder' | 'prefix'> {
    input: UseInputHook<T>;
    validators?: Validator<T>[];
}

export const BaseFormField = <T, >({
                                       type,
                                       size,
                                       input,
                                       prefix,
                                       border,
                                       labelId,
                                       placeholder,
                                   }: BaseFormFieldProps<T>) => {
    const errorMessage = Object.entries(input.errors)?.[0]?.[1] || '';

    return <FormField labelId={labelId}
                      status={!input.isValid ? 'error' : undefined}
                      statusMessage={errorMessage}>
        <Input placeholder={placeholder} type={type} border={border} size={size}
               onBlur={input.onBlur}
               onChange={input.onChange}
               prefix={prefix}/>
    </FormField>;
};
