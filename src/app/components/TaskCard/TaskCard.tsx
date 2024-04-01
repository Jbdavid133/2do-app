import styles from './TaskCard.module.scss';
import {Task} from '@/app/tasks/types/task.types';
import {Badge, Box, Button, Card, Divider, Heading} from '@wix/design-system';
import {DateAndTime, DateChecked, Delete} from '@wix/wix-ui-icons-common';
import moment from 'moment/moment';
import isNil from 'lodash/isNil';
import {TaskPriorityToBadgeSkin} from '@/app/tasks/types/task-priority.types';

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
}

export const TaskCard = (props: TaskCardProps) =>
    <Card>
        <Card.Header title={props.task.title} subtitle={props.task.description}
                     suffix={
                         <Box gap='20px' verticalAlign='middle'>
                             {
                                 props.task.priority !== 'none' &&
                                 <Badge skin={TaskPriorityToBadgeSkin[props.task.priority]}
                                        className={styles.taskBadge}>
                                     {props.task.priority}
                                 </Badge>
                             }
                             <Button priority='secondary' prefixIcon={<Delete/>} onClick={props.onDelete}
                                     size='small'>
                                 Delete
                             </Button>
                         </Box>
                     }/>
        <Divider></Divider>
        <Card.Content>
            <Box verticalAlign='middle' gap='20px'>
                <DateAndTime/>
                <Heading size='tiny'>
                    Created on {moment(props.task.creationDate).format('DD.MM.yyyy')}
                </Heading>
            </Box>
            {
                !isNil(props.task.endDate) &&
                <Box verticalAlign='middle' gap='20px'>
                    <DateChecked/>
                    <Heading size='tiny'>Expires on {moment(props.task.endDate).format('DD.MM.yyyy')} </Heading>
                </Box>
            }
        </Card.Content>
    </Card>;
