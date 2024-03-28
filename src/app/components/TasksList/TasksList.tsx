import {TaskPriorityOrder} from '@/app/tasks/types/task.types';
import {sortBy} from 'lodash';
import {TaskCard} from '@/app/components/TaskCard/TaskCard';
import {useContext} from 'react';
import {TasksContext} from '@/app/context/tasks.context';

export const TasksList = () => {
    const {removeTask, tasks} = useContext(TasksContext);
    const sortedTasks = sortBy(tasks, task => TaskPriorityOrder[task.priority]);

    return <>
        {sortedTasks.map(task => <TaskCard key={task.id} task={task} onDelete={() => removeTask(task.id)}/>)}
    </>;
};