import styles from './TaskCard.module.scss';
import {Task, TaskPriority} from '@/app/tasks/types/task.types';
import {Badge, BadgeSkin, Box, Button, Card, Divider, Heading} from '@wix/design-system';
import {DateAndTime, DateChecked, Delete} from '@wix/wix-ui-icons-common';
import moment from 'moment/moment';
import isNil from 'lodash/isNil';
import {TaskCardDataHook} from '@/app/components/TaskCard/constants/data-hooks.constants';

export interface TaskCardProps {
    task: Task;
    onDelete: () => void;
}

const getBadgeColorByPriority = (priority: TaskPriority): BadgeSkin | undefined => {
    switch (priority) {
        case 'high':
            return 'danger';
        case 'medium':
            return 'warning';
        case 'low':
            return 'standard';
        default:
            return undefined;
    }
};
export const TaskCard = (props: TaskCardProps) =>
    <Card>
        <Card.Header title={props.task.title} subtitle={props.task.description} dataHook={TaskCardDataHook.Header}
                     suffix={
                         <Box gap='20px' verticalAlign='middle'>
                             {
                                 props.task.priority !== 'none' &&
                                 <Badge skin={getBadgeColorByPriority(props.task.priority)}
                                        dataHook={TaskCardDataHook.Badge} className={styles.taskBadge}>
                                     {props.task.priority}
                                 </Badge>
                             }
                             <Button priority='secondary' size='small' prefixIcon={<Delete/>} onClick={props.onDelete}
                                     dataHook={TaskCardDataHook.DeleteButton}>
                                 Delete
                             </Button>
                         </Box>
                     }/>
        <Divider></Divider>
        <Card.Content>
            <Box verticalAlign='middle' gap='20px' dataHook=''>
                <DateAndTime/>
                <Heading size='tiny' dataHook={TaskCardDataHook.CreationDateHeading}>
                    Created on {moment(props.task.creationDate).format('DD.MM.yyyy')}
                </Heading>
            </Box>
            {
                !isNil(props.task.endDate) &&
                <Box verticalAlign='middle' gap='20px'>
                    <DateChecked/>
                    <Heading size='tiny' dataHook={TaskCardDataHook.EndDateHeading}>
                        Expires on {moment(props.task.endDate).format('DD.MM.yyyy')}
                    </Heading>
                </Box>
            }
        </Card.Content>
    </Card>;
