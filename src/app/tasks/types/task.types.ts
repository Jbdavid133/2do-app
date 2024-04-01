import {TaskPriority} from '@/app/tasks/types/task-priority.types';

export interface NewTask {
    title: string;
    description: string;
    priority: TaskPriority;
    endDate: Date | undefined;
}

export interface Task extends NewTask {
    id: string;
    creationDate: Date;
}