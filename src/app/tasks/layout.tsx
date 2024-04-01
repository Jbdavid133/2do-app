'use client';

import {TopBar} from '@/app/components/TopBar/TopBar';
import {ReactNode} from 'react';

const TasksLayout = ({children}: { children: ReactNode }) => {
    return <>
        <TopBar/>
        {children}
    </>;
};

export default TasksLayout;