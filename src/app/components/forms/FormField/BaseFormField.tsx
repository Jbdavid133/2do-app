import {FormField, FormFieldProps, Input, InputProps} from '@wix/design-system';
import React, {forwardRef, Ref, useImperativeHandle} from 'react';
import {useInput} from '@/app/hooks/useInput/useInput';
import {Validator} from '@/app/hooks/useInput/validators';

export interface BaseFormFieldProps extends Pick<FormFieldProps, 'labelId'>,
    Pick<InputProps, 'border' | 'size' | 'type' | 'placeholder' | 'prefix'> {
    validators: Validator[];
}

export interface BaseFormFieldRef {
    value: () => string | undefined;
    isValid: () => boolean | null;
    touch: () => void;
}

const BaseFormField = (props: BaseFormFieldProps, ref: Ref<BaseFormFieldRef>) => {
    const input = useInput({validators: props.validators});
    const errorMessage = Object.entries(input.errors)?.[0]?.[1] || '';

    useImperativeHandle(ref, () => ({
        value: () => input.value,
        isValid: () => input.isTouched && input.isValid,
        touch: input.onTouch
    }));

    return <FormField labelId={props.labelId}
                      dataHook='BaseFormField'
                      status={!input.isValid ? 'error' : undefined}
                      statusMessage={errorMessage}>
        <Input dataHook='BaseFormFieldInput' placeholder={props.placeholder} type={props.type} border={props.border}
               size={props.size}
               onBlur={input.onTouch}
               onChange={input.onChange}
               prefix={props.prefix}/>
    </FormField>;
};

export default forwardRef(BaseFormField);