import {Box, Button, Input} from '@wix/design-system';
import {LockLocked, User} from '@wix/wix-ui-icons-common';
import {FormEvent} from 'react';
import {useInput} from '@/app/hooks/useInput/useInput';
import {FormPropsTypes} from '@/app/components/forms/form-props.types';
import {Validators} from '@/app/hooks/useInput/validators';
import {BaseFormField} from '@/app/components/forms/FormField/BaseFormField';

export const LoginForm = ({onSubmit, className}: FormPropsTypes<string>) => {
    const usernameInput = useInput<string>({
        validators: [
            Validators.Required('Username must be provided'),
            Validators.MaxLength(15, 'Username mast not be longer than 15 characters')]
    });
    const passwordInput = useInput<string>({validators: [Validators.Required('Password must be provided')]});
    const isFormValid = usernameInput.isTouched && usernameInput.isValid && passwordInput.isTouched && passwordInput.isValid;

    const handleLoginFormSubmit = ($event: FormEvent) => {
        $event.preventDefault();

        usernameInput.onBlur();
        passwordInput.onBlur();

        if (isFormValid) {
            onSubmit(usernameInput.value!);
        }
    };

    return <form onSubmit={handleLoginFormSubmit} className={className}>
        <Box direction='vertical' gap='40px'>
            <Box direction='vertical' gap='10px'>
                <BaseFormField labelId='UsernameFormField' placeholder='Username' type='text' border='round'
                               size='large' input={usernameInput}
                               prefix={<Input.IconAffix><User></User></Input.IconAffix>}></BaseFormField>

                <BaseFormField labelId='PasswordFormField' placeholder='Password' type='password' border='round'
                               size='large' input={passwordInput}
                               prefix={<Input.IconAffix><LockLocked></LockLocked></Input.IconAffix>}></BaseFormField>
            </Box>

            <Button type='submit'>Login</Button>
        </Box>
    </form>;
};