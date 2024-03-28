export const TaskPriorities = ['none', 'low', 'medium', 'high'] as const;

export type TaskPriority = typeof TaskPriorities[number];

export const TaskPriorityOrder: Record<TaskPriority, number> = {'none': 3, 'low': 2, 'medium': 1, 'high': 0} as const;

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