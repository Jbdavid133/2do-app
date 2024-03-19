import {Box, Button, FormField, Input} from '@wix/design-system';
import {LockLocked, User} from '@wix/wix-ui-icons-common';
import {FormEvent} from 'react';
import {useInput} from '@/app/hooks/useInput/useInput';
import {FormProps} from '@/app/components/forms/form-props';
import {Validators} from '@/app/hooks/useInput/validators';

export const LoginForm = ({onSubmit, className}: FormProps<string>) => {
    const usernameInput = useInput<string>({
        validators: [
            Validators.Required('Username must be provided'),
            Validators.MaxLength(15, 'Username mast not be longer than 15 characters')]
    });
    const passwordInput = useInput<string>({validators: [Validators.Required('Password must be provided')]});
    const isFormValid = usernameInput.touched && usernameInput.isValid && passwordInput.touched && passwordInput.isValid;

    const handleLoginFormSubmit = ($event: FormEvent) => {
        $event.preventDefault();

        if (isFormValid) {
            onSubmit(usernameInput.value!);
        }
    };

    return <form onSubmit={handleLoginFormSubmit} className={className}>
        <Box direction='vertical' gap='40px'>
            <Box direction='vertical' gap='10px'>
                <FormField labelId='loginFormUsernameInput'
                           status={!usernameInput.isValid ? 'error' : undefined}
                           statusMessage={usernameInput.errors['required'] || usernameInput.errors['maxLength']}>
                    <Input placeholder='Username' type='text' border='round' size='large'
                           onBlur={usernameInput.onBlur}
                           onChange={usernameInput.onChange}
                           prefix={<Input.IconAffix><User></User></Input.IconAffix>}/>
                </FormField>

                <FormField labelId='loginFormPasswordInput'
                           status={!passwordInput.isValid ? 'error' : undefined}
                           statusMessage={passwordInput.errors['required']}>
                    <Input placeholder='Password' type='password' border='round' size='large'
                           onBlur={passwordInput.onBlur}
                           onChange={passwordInput.onChange}
                           prefix={<Input.IconAffix><LockLocked></LockLocked></Input.IconAffix>}/>
                </FormField>
            </Box>

            <Button type='submit'>Login</Button>
        </Box>
    </form>;
};