import {Box, Button, FormField, Input, RadioGroup} from '@wix/design-system';
import {Add, DateChecked, Heading, InfoCircle} from '@wix/wix-ui-icons-common';
import {useFormik} from 'formik';
import startCase from 'lodash/startCase';
import {object, string} from 'yup';
import {CreateTaskDataHook} from '@/app/components/forms/CreateTaskForm/constants/data-hooks.constants';
import {ValidationMessage} from '@/app/components/forms/CreateTaskForm/constants/validation-messages.constants';
import moment from 'moment/moment';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import {NewTask, TaskPriorities, TaskPriorityOrder} from '@/app/tasks/types/task.types';

export interface CreateTaskFormProps {
    onSubmit: (newTask: NewTask) => void;
}

export const CreateTaskForm = (props: CreateTaskFormProps) => {
    const formik = useFormik<NewTask>({
        initialValues: {
            title: '',
            description: '',
            priority: 'none',
            endDate: undefined,
        },
        validationSchema: object({
            title: string()
                .required(ValidationMessage.RequiredTitle)
                .max(30, ValidationMessage.LongTitle),
            description: string()
                .required(ValidationMessage.RequiredDescription)
                .max(50, ValidationMessage.LongDescription),
        }),
        onSubmit: props.onSubmit
    });

    return <form onSubmit={formik.handleSubmit} aria-label='CreateTaskForm'>
        <Box direction='vertical' gap='20px'>
            <FormField labelId='TitleFormField'
                       dataHook={CreateTaskDataHook.TitleFormField}
                       statusMessage={formik.touched.title && formik.errors.title}
                       status={formik.touched.title && formik.errors.title ? 'error' : undefined}>
                <Input placeholder='* Title' type='text' size='large' id='title' name='title'
                       prefix={<Input.IconAffix><Heading/></Input.IconAffix>} dataHook={CreateTaskDataHook.TitleInput}
                       onChange={formik.handleChange} value={formik.values.title}/>
            </FormField>

            <FormField labelId='DescriptionFormField'
                       dataHook={CreateTaskDataHook.DescriptionFormField}
                       statusMessage={formik.touched.description && formik.errors.description}
                       status={formik.touched.description && formik.errors.description ? 'error' : undefined}>
                <Input placeholder='* Description' type='text' size='large' id='description' name='description'
                       prefix={<Input.IconAffix><InfoCircle/></Input.IconAffix>}
                       dataHook={CreateTaskDataHook.DescriptionInput}
                       onChange={formik.handleChange} value={formik.values.description}/>
            </FormField>

            <Input placeholder='End Date' type='date' size='large' id='endDate' name='endDate'
                   statusMessage={formik.errors.endDate}
                   dataHook={CreateTaskDataHook.EndDateInput}
                   status={formik.errors.endDate ? 'error' : undefined}
                   prefix={<Input.IconAffix><DateChecked/></Input.IconAffix>}
                   value={!isNil(formik.values.endDate) ? moment(formik.values.endDate).format('yyyy-MM-DD') : ''}
                   onChange={(event) => {
                       formik.setFieldValue('endDate', isEmpty(event.target.value) ? undefined : moment(event.target.value, 'yyyy-MM-DD').toDate());
                   }}/>

            <RadioGroup display='horizontal' selectionArea='always' selectionAreaSkin='outlined' spacing='20px'
                        selectionAreaPadding='8px 10px' name='prioity' type='default'
                        fullWidth={true} value={formik.values.priority} dataHook={CreateTaskDataHook.PriorityRadioGroup}
                        onChange={(priority) => formik.setFieldValue('priority', priority)}>
                {TaskPriorities.map(priority =>
                    <RadioGroup.Radio id={`${TaskPriorityOrder[priority]}`} key={priority}
                                      value={priority}>{startCase(priority)}</RadioGroup.Radio>
                )}
            </RadioGroup>

            <Button type='submit' prefixIcon={<Add/>}>Create</Button>
        </Box>
    </form>;
};