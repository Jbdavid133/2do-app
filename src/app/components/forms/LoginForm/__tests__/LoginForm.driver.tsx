import {fireEvent, render, RenderResult} from '@testing-library/react';
import {FormProps} from '@/app/components/forms/form.props';
import {LoginForm} from '@/app/components/forms/LoginForm/LoginForm';
import React from 'react';
import isNil from 'lodash/isNil';

export class LoginFormDriver {
    private wrapper: RenderResult | undefined;
    private props: FormProps<string> = {
        onSubmit: () => {
        }
    };

    given = {
        onSubmit: (onSubmit: FormProps<string>['onSubmit']) => {
            this.props.onSubmit = onSubmit;
            return this;
        }
    };

    when = {
        rendered: () => {
            this.wrapper = render(<LoginForm {...this.props}/>);

            return this;
        },
        enterUsername: (username: string) => {
            this.setInput(username, 'Username');

            return this;
        },
        enterPassword: (password: string) => {
            this.setInput(password, 'Password');

            return this;
        },
        submit: () => {
            const formElement = this.wrapper?.getByRole('form');
            !isNil(formElement) && fireEvent.submit(formElement);

            return this;
        }
    };

    setInput(value: string, placeholder: string) {
        const inputElement = this.wrapper?.getByPlaceholderText(placeholder);
        !isNil(inputElement) && fireEvent.change(inputElement, {target: {value}});
    }
}