export const TaskPriorities = ['none', 'low', 'medium', 'high'] as const;

export type TaskPriority = typeof TaskPriorities[number]

export interface NewTask {
    title: string;
    description: string;
    priority: TaskPriority;
    endDate: Date | undefined;
}

export interface CreateTaskFormProps {
    onSubmit: (newTask: NewTask) => void;
}