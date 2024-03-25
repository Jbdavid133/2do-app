import {render} from '@testing-library/react';
import BaseFormField, {BaseFormFieldProps} from '@/app/components/forms/FormField/BaseFormField';
import {FormFieldTestkit, InputTestkit} from '@wix/design-system/dist/testkit';
import {Validator} from '@/app/hooks/useInput/validators';
import {DataHooks} from '@/app/constants/data-hooks.constants';

export class BaseFormFieldDriver {
    private wrapper = render(<></>);
    private props: BaseFormFieldProps = {
        validators: [],
        inputDataHook: DataHooks.Input,
        formFieldDataHook: DataHooks.FormField,
    };

    given = {
        validators: (validators: Validator[]) => {
            this.props.validators = validators;
            return this;
        },
    };

    testkit = {
        input: (dataHook: string | undefined) => InputTestkit({
            wrapper: this.wrapper.baseElement,
            dataHook: dataHook || ''
        }),
        formField: (dataHook: string | undefined) => FormFieldTestkit({
            wrapper: this.wrapper.baseElement,
            dataHook: dataHook || ''
        })
    };

    when = {
        rendered: () => {
            this.wrapper = render(<BaseFormField {...this.props}></BaseFormField>);
            return this;
        },
        focus: async () => {
            await this.get.input().focus();
            return this;
        },
        blur: async () => {
            await this.get.input().blur();
            return this;
        },
        enterValue: async (value: string) => {
            await this.get.input().enterText(value);
            return this;
        }
    };

    get = {
        input: () => this.testkit.input(this.props.inputDataHook),
        formField: () => this.testkit.formField(this.props.formFieldDataHook)
    };
}