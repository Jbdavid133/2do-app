'use client';

import {Box, Button, Card, Page} from '@wix/design-system';
import {CreateTaskForm} from '@/app/components/forms/CreateTaskForm/CreateTaskForm';
import {NewTask} from '@/app/tasks/types/task.types';
import {useContext} from 'react';
import {TasksContext} from '@/app/context/tasks.context';
import {Chance} from 'chance';
import {ArrowLeft} from '@wix/wix-ui-icons-common';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const chance = new Chance();

const CreateTask = () => {
    const router = useRouter();
    const {upsertTask} = useContext(TasksContext);

    const handleCreateNewTask = (newTask: NewTask) => {
        upsertTask({id: chance.cf(), creationDate: new Date(), ...newTask});
        router.push('/tasks');
    };

    return <Page className='page' maxWidth={800} minWidth={500}>
        <Page.Header
            title='Create New Task' actionsBar={
            <Link href='/tasks'>
                <Button priority='secondary' prefixIcon={<ArrowLeft/>}>
                    Back To All
                </Button>
            </Link>
        }></Page.Header>
        <Page.Content>
            <Box align='center'>
                <Card stretchVertically>
                    <Card.Header title='Fill in the new task details'
                                 subtitle='Only inputs labeled with * are required'></Card.Header>
                    <Card.Content>
                        <CreateTaskForm onSubmit={handleCreateNewTask}/>
                    </Card.Content>
                </Card>
            </Box>
        </Page.Content>
    </Page>;
};

export default CreateTask;