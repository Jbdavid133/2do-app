import {TaskPriorityOrder} from '@/app/tasks/types/task.types';
import {sortBy} from 'lodash';
import {TaskCard} from '@/app/components/TaskCard/TaskCard';
import {useContext} from 'react';
import {TasksContext} from '@/app/context/tasks.context';
import isEmpty from 'lodash/isEmpty';
import {EmptyState, TextButton} from '@wix/design-system';
import {Add, SparklesFilled} from '@wix/wix-ui-icons-common';
import Link from 'next/link';

export const TasksList = () => {
    const {removeTask, tasks} = useContext(TasksContext);
    const sortedTasks = sortBy(Object.values(tasks), task => TaskPriorityOrder[task.priority]);

    if (isEmpty(sortedTasks)) {
        return <EmptyState title='There are no open tasks'
                           subtitle='Either you are new here or checked all your tasks, always fell free to create new ones and never forget a thing!'
                           image={<SparklesFilled size='100px' color='#3899ec'/>} theme='page'>
            <Link href='/tasks/create'>
                <TextButton prefixIcon={<Add/>}>Create new task</TextButton>
            </Link>
        </EmptyState>;
    }
    return <>
        {sortedTasks.map(task => <TaskCard key={task.id} task={task} onDelete={() => removeTask(task.id)}/>)}
    </>;
};