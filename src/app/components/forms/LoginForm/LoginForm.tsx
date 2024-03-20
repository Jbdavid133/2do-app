import {Box, Button, Input} from '@wix/design-system';
import {LockLocked, User} from '@wix/wix-ui-icons-common';
import {FormEvent, useRef} from 'react';
import {FormPropsTypes} from '@/app/components/forms/form-props.types';
import {Validator, Validators} from '@/app/hooks/useInput/validators';
import BaseFormField, {BaseFormFieldRef} from '@/app/components/forms/FormField/BaseFormField';

export const LoginForm = ({onSubmit, className}: FormPropsTypes<string>) => {
    const usernameInputRef = useRef<BaseFormFieldRef>(null);
    const usernameInputValidators: Validator[] = [
        Validators.Required('Username must be provided'),
        Validators.MaxLength(15, 'Username mast not be longer than 15 characters')];
    const passwordInputRef = useRef<BaseFormFieldRef>(null);
    const passwordInputValidators: Validator[] = [Validators.Required('Password must be provided')];

    const handleLoginFormSubmit = ($event: FormEvent) => {
        $event.preventDefault();

        usernameInputRef.current?.touch();
        passwordInputRef.current?.touch();

        if (usernameInputRef.current?.isValid() && passwordInputRef.current?.isValid()) {
            onSubmit(usernameInputRef.current?.value()!);
        }
    };

    return <form onSubmit={handleLoginFormSubmit} className={className}>
        <Box direction='vertical' gap='40px'>
            <Box direction='vertical' gap='10px'>
                <BaseFormField labelId='UsernameFormField' placeholder='Username' type='text' border='round'
                               size='large'
                    //@ts-ignore
                               validators={usernameInputValidators} ref={usernameInputRef}
                               prefix={<Input.IconAffix><User></User></Input.IconAffix>}></BaseFormField>

                <BaseFormField labelId='PasswordFormField' placeholder='Password' type='password' border='round'
                               size='large'
                    //@ts-ignore
                               validators={passwordInputValidators} ref={passwordInputRef}
                               prefix={<Input.IconAffix><LockLocked></LockLocked></Input.IconAffix>}></BaseFormField>
            </Box>

            <Button type='submit'>Login</Button>
        </Box>
    </form>;
};