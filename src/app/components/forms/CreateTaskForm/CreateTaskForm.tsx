import {Box, Button, FormField, Input, RadioGroup} from '@wix/design-system';
import {DateChecked, Heading, InfoCircle} from '@wix/wix-ui-icons-common';
import {CreateTaskFormProps, NewTask, TaskPriorities} from '@/app/components/forms/CreateTaskForm/CreateTaskForm.types';
import {useFormik} from 'formik';
import startCase from 'lodash/startCase';
import {object, string} from 'yup';
import {CreateTaskDataHook} from '@/app/components/forms/CreateTaskForm/constants/data-hooks.constants';
import {ValidationMessage} from '@/app/components/forms/CreateTaskForm/constants/validation-messages.constants';
import moment from 'moment/moment';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

export const CreateTaskForm = (props: CreateTaskFormProps) => {
    const {setFieldValue, values, touched, errors, handleSubmit, handleChange} = useFormik<NewTask>({
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

    return <form onSubmit={handleSubmit} aria-label='CreateTaskForm'>
        <Box direction='vertical' gap='20px'>
            <FormField labelId='TitleFormField'
                       dataHook={CreateTaskDataHook.TitleFormField}
                       statusMessage={touched.title && errors.title}
                       status={touched.title && errors.title ? 'error' : undefined}>
                <Input placeholder='* Title' type='text' size='large' id='title' name='title'
                       prefix={<Input.IconAffix><Heading/></Input.IconAffix>} dataHook={CreateTaskDataHook.TitleInput}
                       onChange={handleChange} value={values.title}/>
            </FormField>

            <FormField labelId='DescriptionFormField'
                       dataHook={CreateTaskDataHook.DescriptionFormField}
                       statusMessage={touched.description && errors.description}
                       status={touched.description && errors.description ? 'error' : undefined}>
                <Input placeholder='* Description' type='text' size='large' id='description' name='description'
                       prefix={<Input.IconAffix><InfoCircle/></Input.IconAffix>}
                       dataHook={CreateTaskDataHook.DescriptionInput}
                       onChange={handleChange} value={values.description}/>
            </FormField>

            <Input placeholder='End Date' type='date' size='large' id='endDate' name='endDate'
                   statusMessage={errors.endDate}
                   dataHook={CreateTaskDataHook.EndDateInput}
                   status={errors.endDate ? 'error' : undefined}
                   prefix={<Input.IconAffix><DateChecked/></Input.IconAffix>}
                   value={!isNil(values.endDate) ? moment(values.endDate).format('yyyy-MM-DD') : ''}
                   onChange={(event) => {
                       setFieldValue('endDate', isEmpty(event.target.value) ? undefined : moment(event.target.value, 'yyyy-MM-DD').toDate());
                   }}/>

            <RadioGroup display='horizontal' selectionArea='always' selectionAreaSkin='outlined' spacing='20px'
                        selectionAreaPadding='8px 10px' name='prioity' type='default'
                        fullWidth={true} value={values.priority} dataHook={CreateTaskDataHook.PriorityRadioGroup}
                        onChange={(priority) => setFieldValue('priority', priority)}>
                {TaskPriorities.map(priority =>
                    <RadioGroup.Radio id={Date.now().toString()} key={priority}
                                      value={priority}>{startCase(priority)}</RadioGroup.Radio>
                )}
            </RadioGroup>

            <Button type='submit'>Done</Button>
        </Box>
    </form>;
};