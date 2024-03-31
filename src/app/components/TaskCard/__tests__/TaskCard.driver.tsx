import {render} from '@testing-library/react';
import {TaskCard, TaskCardProps} from '@/app/components/TaskCard/TaskCard';
import {Chance} from 'chance';
import {TaskPriority} from '@/app/tasks/types/task.types';
import {BadgeTestkit, ButtonTestkit, CardHeaderTestkit, HeadingTestkit} from '@wix/design-system/dist/testkit';
import {TaskCardDataHook} from '@/app/components/TaskCard/constants/data-hooks.constants';

export class TaskCardDriver {
    private chance = new Chance();
    private wrapper = render(<></>);
    private props: TaskCardProps = {
        task: {
            priority: 'none',
            endDate: undefined,
            id: this.chance.cf(),
            title: this.chance.string(),
            creationDate: this.chance.date(),
            description: this.chance.string(),
        },
        onDelete: () => {
        }
    };

    testkit = {
        badge: (dataHook: string) => BadgeTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        button: (dataHook: string) => ButtonTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        heading: (dataHook: string) => HeadingTestkit({wrapper: this.wrapper.baseElement, dataHook}),
        cardHeader: (dataHook: string) => CardHeaderTestkit({wrapper: this.wrapper.baseElement, dataHook})
    };

    given = {
        title: (title: string) => {
            this.props.task.title = title;
            return this;
        },
        description: (description: string) => {
            this.props.task.description = description;
            return this;
        },
        priority: (priority: TaskPriority) => {
            this.props.task.priority = priority;
            return this;
        },
        creationDate: (creationDate: Date) => {
            this.props.task.creationDate = creationDate;
            return this;
        },
        endDate: (endDate: Date | undefined) => {
            this.props.task.endDate = endDate;
            return this;
        },
        onDelete: (onDelete: () => void) => {
            this.props.onDelete = onDelete;
            return this;
        }
    };

    when = {
        rendered: () => {
            this.wrapper.unmount();
            this.wrapper = render(<TaskCard {...this.props}/>);
            return this;
        },
        deleteButtonClicked: async () => this.get.deleteButton().click()
    };

    get = {
        badge: () => this.testkit.badge(TaskCardDataHook.Badge),
        endDateHeading: () => this.testkit.heading(TaskCardDataHook.EndDateHeading),
        deleteButton: () => this.testkit.button(TaskCardDataHook.DeleteButton),
        creationDateHeading: () => this.testkit.heading(TaskCardDataHook.CreationDateHeading),
        title: async () => this.testkit.cardHeader(TaskCardDataHook.Header).title(),
        description: async () => this.testkit.cardHeader(TaskCardDataHook.Header).subtitle()
    };
}