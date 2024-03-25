import {Box, Button, Input} from '@wix/design-system';
import {LockLocked, User} from '@wix/wix-ui-icons-common';
import {FormEvent, useRef} from 'react';
import {FormPropsTypes} from '@/app/components/forms/form-props.types';
import {Validator, Validators} from '@/app/hooks/useInput/validators';
import BaseFormField, {BaseFormFieldRef} from '@/app/components/forms/FormField/BaseFormField';

const PASSWORD_VALIDATORS: Validator[] = [Validators.Required('Password must be provided')];
const USERNAME_VALIDATORS: Validator[] = [Validators.Required('Username must be provided'),
    Validators.MaxLength(15, 'Username mast not be longer than 15 characters')];

export const LoginForm = ({onSubmit, className}: FormPropsTypes<string>) => {
    const usernameInputRef = useRef<BaseFormFieldRef>(null);
    const passwordInputRef = useRef<BaseFormFieldRef>(null);

    const handleLoginFormSubmit = ($event: FormEvent) => {
        $event.preventDefault();

        usernameInputRef.current?.touch();
        passwordInputRef.current?.touch();

        if (usernameInputRef.current?.isValid() && passwordInputRef.current?.isValid()) {
            onSubmit(usernameInputRef.current?.value()!);
        }
    };

    return <form onSubmit={handleLoginFormSubmit} className={className} aria-label='LoginForm'>
        <Box direction='vertical' gap='40px'>
            <Box direction='vertical' gap='10px'>
                <BaseFormField labelId='UsernameFormField' placeholder='Username' type='text' border='round'
                               size='large'
                               validators={USERNAME_VALIDATORS} ref={usernameInputRef}
                               prefix={<Input.IconAffix><User></User></Input.IconAffix>}></BaseFormField>

                <BaseFormField labelId='PasswordFormField' placeholder='Password' type='password' border='round'
                               size='large'
                               validators={PASSWORD_VALIDATORS} ref={passwordInputRef}
                               prefix={<Input.IconAffix><LockLocked></LockLocked></Input.IconAffix>}></BaseFormField>
            </Box>

            <Button type='submit'>Login</Button>
        </Box>
    </form>;
};