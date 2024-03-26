export const TaskPriorities = ['none', 'low', 'medium', 'high'] as const;

export type TaskPriority = typeof TaskPriorities[number]

export interface CreateTaskFormFields {
    title: string;
    description: string;
    priority: TaskPriority;
    endDate: Date | undefined;
}

export interface CreateTaskFormProps {
    onCreateNewTask: (newTask: CreateTaskFormFields) => void;
}