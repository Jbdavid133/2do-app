import {beforeEach, describe, expect, it} from '@jest/globals';
import {BaseFormFieldDriver} from '@/app/components/forms/FormField/__tests__/BaseFormField.driver';
import {Validators} from '@/app/hooks/useInput/validators';

describe('Base Form Field', () => {
    const VALIDATOR_ERROR_MESSAGE = 'Test form field id required';
    let baseFormFieldDriver: BaseFormFieldDriver;

    beforeEach(() => {
        baseFormFieldDriver = new BaseFormFieldDriver();
        baseFormFieldDriver.given.validators([Validators.Required(VALIDATOR_ERROR_MESSAGE)]);
        baseFormFieldDriver.when.rendered();
    });

    it('Should not show error when input is empty before blur', async () => {
        await baseFormFieldDriver.when.focus();

        const hasError = await baseFormFieldDriver.get.hasStatus('error');

        expect(hasError).toBeFalsy();
    });

    it('Should show error when input is empty after blur', async () => {
        await baseFormFieldDriver.when.blur();

        await assertInputHasError();
    });

    it('Should show error when changing value', async () => {
        await baseFormFieldDriver.when.enterValue('Some random text');
        await baseFormFieldDriver.when.enterValue('');

        await assertInputHasError();
    });

    const assertInputHasError = async () => {
        const hasError = await baseFormFieldDriver.get.hasStatus('error');
        const errorMessage = await baseFormFieldDriver.get.statusMessage();

        expect(hasError).toBeTruthy();
        expect(errorMessage).toEqual(VALIDATOR_ERROR_MESSAGE);
    };
});