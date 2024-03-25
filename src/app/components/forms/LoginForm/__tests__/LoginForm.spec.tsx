import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {LoginFormDriver} from '@/app/components/forms/LoginForm/__tests__/LoginForm.driver';
import {waitFor} from '@testing-library/react';
import {Chance} from 'chance';

const chance = new Chance();

const USERNAME = chance.email({length: 10});
const PASSWORD = chance.string();

describe('Login Form', () => {
    let loginFormDriver: LoginFormDriver;
    let onSubmitMock = jest.fn();

    beforeEach(() => {
        loginFormDriver = new LoginFormDriver();
        loginFormDriver.given.onSubmit(onSubmitMock).when.rendered();
    });

    describe('Should not call onSubmit', () => {
        it('Missing username and password', () => {
            loginFormDriver.when.submit();

            waitFor(() => expect(onSubmitMock).not.toHaveBeenCalled());
        });

        it('Missing username only', () => {
            loginFormDriver.when.enterPassword(PASSWORD).when.submit();

            waitFor(() => expect(onSubmitMock).not.toHaveBeenCalled());
        });

        it('Missing password only', () => {
            loginFormDriver.when.enterUsername(USERNAME).when.submit();

            waitFor(() => expect(onSubmitMock).not.toHaveBeenCalled());
        });

        it('Username too long', () => {
            loginFormDriver.when.enterPassword(PASSWORD)
                .when.enterUsername(USERNAME.repeat(15))
                .when.submit();

            waitFor(() => expect(onSubmitMock).not.toHaveBeenCalled());
        });
    });

    describe('Should call onSubmit', () => {
        it('Valid username and password', () => {
            loginFormDriver.when.enterPassword(PASSWORD)
                .when.enterUsername(USERNAME)
                .when.submit();

            waitFor(() => expect(onSubmitMock).toHaveBeenCalledWith(USERNAME));
        });
    });
});