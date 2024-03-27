import {act, fireEvent, render} from '@testing-library/react';
import {CreateTaskFormProps, TaskPriorities} from '@/app/components/forms/CreateTaskForm/CreateTaskForm.types';
import {CreateTaskForm} from '@/app/components/forms/CreateTaskForm/CreateTaskForm';
import {FormFieldTestkit, InputTestkit, RadioGroupTestkit} from '@wix/design-system/dist/testkit';
import {CreateTaskDataHook} from '@/app/components/forms/CreateTaskForm/constants/data-hooks.constants';
import {Chance} from 'chance';

export class CreateTaskFormDriver {
    private chance = new Chance();
    private wrapper = render(<></>);
    private props: CreateTaskFormProps = {
        onSubmit: () => {
        }
    };

    testkit = {
        input: (dataHook: string) => InputTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        formField: (dataHook: string) => FormFieldTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        radioGroup: (dataHook: string) => RadioGroupTestkit({wrapper: this.wrapper.baseElement, dataHook})
    };

    given = {
        onSubmit: (onSubmit: CreateTaskFormProps['onSubmit']) => {
            this.props.onSubmit = onSubmit;
            return this;
        }
    };

    when = {
        rendered: () => {
            this.wrapper = render(<CreateTaskForm {...this.props}/>);

            return this;
        },
        enterTitle: async (valid = true) => {
            const title = this.get.randomText(30, valid);
            await this.get.titleInput().enterText(title);

            return this;
        },
        enterDescription: async (valid = true) => {
            const description = this.get.randomText(30, valid);
            await this.get.descriptionInput().enterText(description);

            return this;
        },
        enterEndDate: async () => {
            const date = this.chance.date().toLocaleDateString('en-GB', {});
            await this.get.endDateInput().enterText(date);

            return this;
        },
        changePriority: async () => {
            const priority = this.chance.pickone([...TaskPriorities]);
            await this.get.priorityRadioGroup().selectByValue(priority);
            return this;
        },
        submit: async () => {
            const form = this.wrapper.getByRole('form');
            await act(() => fireEvent.submit(form));

            return this;
        }
    };

    get = {
        titleFormField: () => this.testkit.formField(CreateTaskDataHook.TitleFormField),
        descriptionFormField: () => this.testkit.formField(CreateTaskDataHook.DescriptionFormField),
        titleInput: () => this.testkit.input(CreateTaskDataHook.TitleInput),
        endDateInput: () => this.testkit.input(CreateTaskDataHook.EndDateInput),
        descriptionInput: () => this.testkit.input(CreateTaskDataHook.DescriptionInput),
        priorityRadioGroup: () => this.testkit.radioGroup(CreateTaskDataHook.PriorityRadioGroup),
        randomText: (maxLength: number, valid = true) => {
            const textLength = this.chance.integer({min: 1, max: maxLength});
            const text = this.chance.string({length: textLength});

            return valid ? text : text.repeat(maxLength);
        }
    };
}