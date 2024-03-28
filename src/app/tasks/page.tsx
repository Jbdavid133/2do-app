'use client';

import {Box, Button, Page} from '@wix/design-system';
import {Add} from '@wix/wix-ui-icons-common';
import Link from 'next/link';
import {TasksList} from '@/app/components/TasksList/TasksList';

const Tasks = () =>
    <Page className='page' minWidth={200} maxWidth={800} height='100vh'>
        <Page.Header title='My Tasks'
                     subtitle='Browse all open tasks, delete and add new ones'
                     actionsBar={
                         <Link href='/tasks/create'>
                             <Button prefixIcon={<Add></Add>}>Create New Task</Button>
                         </Link>
                     }/>
        <Page.Content>
            <Box gap='20px' direction='vertical'>
                <TasksList></TasksList>
            </Box>
        </Page.Content>
    </Page>;

export default Tasks;