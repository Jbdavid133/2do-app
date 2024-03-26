'use client';

import styles from './page.module.scss';
import {Box, Card, Page} from '@wix/design-system';
import {CreateTaskForm} from '@/app/components/forms/CreateTaskForm/CreateTaskForm';
import {CreateTaskFormFields} from '@/app/components/forms/CreateTaskForm/CreateTaskForm.types';

const CreateTask = () => {
    const handleCreateNewTask = (newTask: CreateTaskFormFields) => {

    };

    return <Page className={styles.page}>
        <Page.Header title='Create New Task'></Page.Header>
        <Page.Content>
            <Box align='center'>
                <Card>
                    <Card.Header title='Fill in the new task details'
                                 subtitle='Only inputs labeled with * are required'></Card.Header>
                    <Card.Content>
                        <CreateTaskForm onCreateNewTask={handleCreateNewTask}/>
                    </Card.Content>
                </Card>
            </Box>
        </Page.Content>
    </Page>;
};

export default CreateTask;