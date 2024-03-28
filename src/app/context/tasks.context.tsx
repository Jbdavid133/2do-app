'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Task} from '@/app/tasks/types/task.types';
import {Dictionary, omit} from 'lodash';
import {LocalStorageKey} from '@/app/constants';
import {AuthenticationContext} from '@/app/context/authentication.context';
import isNil from 'lodash/isNil';
import {useStorage} from '@/app/hooks/useStorage/useStorage';

interface TasksState {
    tasks: Dictionary<Task>;
    upsertTask: (task: Task) => void;
    removeTask: (id: string) => void;
    setTasks: (tasks: Dictionary<Task>) => void;
}

const initialState: TasksState = {
    tasks: {},
    upsertTask: () => {
    },
    removeTask: () => {
    },
    setTasks: () => {
    },
};

export const TasksContext = createContext<TasksState>(initialState);

export const TasksContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const {username} = useContext(AuthenticationContext);
    const tasksFromStorage = useStorage<Record<string, Dictionary<Task>>>(LocalStorageKey.TASKS);
    const [tasks, setTasks] = useState<TasksState['tasks']>({});

    useEffect(() => {
        if (!isNil(username) && tasksFromStorage.isInitialized) {
            tasksFromStorage.setValue({
                ...tasksFromStorage.value,
                [username]: tasks
            });
        }
    }, [tasks, tasksFromStorage.isInitialized]);

    useEffect(() => {
        if (tasksFromStorage.isInitialized) {
            setTasks(username && tasksFromStorage.value?.[username] || {});
        }
    }, [username, tasksFromStorage.isInitialized]);

    const upsertTask = (task: Task) => {
        setTasks(tasks => ({...tasks, [task.id]: task}));
    };

    const removeTask = (id: string) => {
        setTasks(tasks => omit(tasks, id));
    };

    return <TasksContext.Provider value={{tasks, setTasks, upsertTask, removeTask}}>
        {props.children}
    </TasksContext.Provider>;
};