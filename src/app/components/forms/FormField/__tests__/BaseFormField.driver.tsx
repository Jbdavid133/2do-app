import {render, RenderResult} from '@testing-library/react';
import BaseFormField, {BaseFormFieldProps} from '@/app/components/forms/FormField/BaseFormField';
import {FormFieldUniDriver} from '@wix/design-system/dist/types/FormField/FormField.uni.driver';
import {FormFieldTestkit, InputTestkit} from '@wix/design-system/dist/testkit';
import {InputUniDriver} from '@wix/design-system/dist/types/Input/Input.uni.driver';
import {Validator} from '@/app/hooks/useInput/validators';
import {StatusIndications} from '@wix/design-system';

export class BaseFormFieldDriver {
    private wrapper: RenderResult | undefined;
    private inputDriver: InputUniDriver | undefined;
    private formFieldDriver: FormFieldUniDriver | undefined;
    private props: BaseFormFieldProps = {validators: []};

    given = {
        validators: (validators: Validator[]) => {
            this.props.validators = validators;
            return this;
        },
    };

    when = {
        rendered: () => {
            this.wrapper = render(<BaseFormField {...this.props}></BaseFormField>);
            this.formFieldDriver = FormFieldTestkit({wrapper: this.wrapper.baseElement, dataHook: 'BaseFormField'});
            this.inputDriver = InputTestkit({wrapper: this.wrapper.baseElement, dataHook: 'BaseFormFieldInput'});
            return this;
        },
        focus: async () => {
            await this.inputDriver?.focus();
            const a = await this.inputDriver?.isFocus();
            return this;
        },
        blur: async () => {
            await this.inputDriver?.blur();
            return this;
        },
        enterValue: async (value: string) => {
            await this.inputDriver?.enterText(value);
            return this;
        }
    };

    get = {
        hasStatus: (status: StatusIndications) => this.formFieldDriver?.hasStatus(status),
        statusMessage: () => this.formFieldDriver?.getStatusMessage()
    };
}