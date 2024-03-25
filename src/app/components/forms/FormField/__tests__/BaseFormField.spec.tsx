import {beforeEach, describe, expect, it} from '@jest/globals';
import {BaseFormFieldDriver} from '@/app/components/forms/FormField/__tests__/BaseFormField.driver';
import {Validators} from '@/app/hooks/useInput/validators';
import {Chance} from 'chance';

describe('Base Form Field', () => {
    const chance = new Chance();
    const VALIDATOR_ERROR_MESSAGE = 'Test form field id required';
    let baseFormFieldDriver: BaseFormFieldDriver;

    beforeEach(() => {
        baseFormFieldDriver = new BaseFormFieldDriver();
        baseFormFieldDriver.given.validators([Validators.Required(VALIDATOR_ERROR_MESSAGE)]);
        baseFormFieldDriver.when.rendered();
    });

    it('Should not show error when input is empty before blur', async () => {
        await baseFormFieldDriver.when.focus();

        const hasError = await baseFormFieldDriver.get.formField().hasStatus('error');

        expect(hasError).toBeFalsy();
    });

    it('Should not show error when input is valid', async () => {
        await baseFormFieldDriver.when.enterValue(chance.string());

        const hasError = await baseFormFieldDriver.get.formField().hasStatus('error');

        expect(hasError).toBeFalsy();
    });

    it('Should show error when input is empty after blur', async () => {
        await baseFormFieldDriver.when.blur();

        const errorMessage = await baseFormFieldDriver.get.formField().getStatusMessage();
        const hasError = await baseFormFieldDriver.get.formField().hasStatus('error');

        expect(hasError).toBeTruthy();
        expect(errorMessage).toEqual(VALIDATOR_ERROR_MESSAGE);
    });

    it('Should show error when changing value', async () => {
        await baseFormFieldDriver.when.enterValue(chance.string());
        await baseFormFieldDriver.when.enterValue('');

        const errorMessage = await baseFormFieldDriver.get.formField().getStatusMessage();
        const hasError = await baseFormFieldDriver.get.formField().hasStatus('error');

        expect(hasError).toBeTruthy();
        expect(errorMessage).toEqual(VALIDATOR_ERROR_MESSAGE);
    });
});