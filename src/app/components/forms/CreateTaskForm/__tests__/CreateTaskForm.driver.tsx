import {act, fireEvent, render} from '@testing-library/react';
import {CreateTaskForm} from '@/app/components/forms/CreateTaskForm/CreateTaskForm';
import {FormFieldTestkit, InputTestkit, RadioGroupTestkit} from '@wix/design-system/dist/testkit';
import {CreateTaskDataHook} from '@/app/components/forms/CreateTaskForm/constants/data-hooks.constants';
import moment from 'moment/moment';
import {FormProps} from '@/app/components/forms/form.props';
import {NewTask} from '@/app/tasks/types/task.types';
import {TaskPriority} from '@/app/tasks/types/task-priority.types';

export class CreateTaskFormDriver {
    private wrapper = render(<></>);
    private props: FormProps<NewTask> = {
        onSubmit: () => {
        }
    };

    testkit = {
        input: (dataHook: string) => InputTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        formField: (dataHook: string) => FormFieldTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        radioGroup: (dataHook: string) => RadioGroupTestkit({wrapper: this.wrapper.baseElement, dataHook})
    };

    given = {
        onSubmit: (onSubmit: FormProps<NewTask>['onSubmit']) => {
            this.props.onSubmit = onSubmit;
            return this;
        }
    };

    when = {
        rendered: () => {
            this.wrapper = render(<CreateTaskForm {...this.props}/>);

            return this;
        },
        enterTitle: async (title: string) => {
            await this.get.titleInput().enterText(title);

            return this;
        },
        enterDescription: async (description: string) => {
            await this.get.descriptionInput().enterText(description);

            return this;
        },
        enterEndDate: async (endDate: Date) => {
            const endDateString = moment(endDate).format('yyyy-MM-DD');
            await this.get.endDateInput().enterText(endDateString);

            return this;
        },
        changePriority: async (priority: TaskPriority) => {
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
    };
}