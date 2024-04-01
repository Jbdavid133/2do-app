import {BadgeSkin} from '@wix/design-system';

export const TaskPriorities = ['none', 'low', 'medium', 'high'] as const;

export type TaskPriority = typeof TaskPriorities[number];

export const TaskPriorityOrder: Record<TaskPriority, number> = {'none': 3, 'low': 2, 'medium': 1, 'high': 0} as const;

export const TaskPriorityToBadgeSkin: Record<Exclude<TaskPriority, 'none'>, BadgeSkin> = {
    high: 'danger',
    low: 'standard',
    medium: 'warning'
};