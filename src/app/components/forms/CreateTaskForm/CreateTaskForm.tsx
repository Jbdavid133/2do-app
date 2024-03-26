'use client';

import {Box, Button, FormField, Input, RadioGroup} from '@wix/design-system';
import {DateChecked, Heading, InfoCircle} from '@wix/wix-ui-icons-common';
import {
    CreateTaskFormFields,
    CreateTaskFormProps,
    TaskPriorities
} from '@/app/components/forms/CreateTaskForm/CreateTaskForm.types';
import {useFormik} from 'formik';
import startCase from 'lodash/startCase';
import {object, string} from 'yup';

export const CreateTaskForm = (props: CreateTaskFormProps) => {
    const {setFieldValue, values, touched, errors, handleSubmit, handleChange} = useFormik<CreateTaskFormFields>({
        initialValues: {
            title: '',
            description: '',
            priority: 'none',
            endDate: undefined,
        },
        validationSchema: object({
            title: string()
                .required('Please provide a title to the task')
                .max(30, 'Title can only contain up to 30 characters'),
            description: string()
                .required('Please provide a description to the task')
                .max(50, 'Description can only contain up to 50 characters'),
        }),
        onSubmit: props.onCreateNewTask
    });

    return <form onSubmit={handleSubmit}>
        <Box direction='vertical' gap='20px'>
            <FormField labelId='TitleFormField'
                       status={touched.title && errors.title ? 'error' : undefined}
                       statusMessage={touched.title && errors.title}>
                <Input placeholder='* Title' type='text' size='large' id='title' name='title'
                       prefix={<Input.IconAffix><Heading/></Input.IconAffix>}
                       onChange={handleChange} value={values.title}/>
            </FormField>

            <FormField labelId='DescriptionFormField'
                       statusMessage={touched.description && errors.description}
                       status={touched.description && errors.description ? 'error' : undefined}>
                <Input placeholder='* Description' type='text' size='large' id='description' name='description'
                       prefix={<Input.IconAffix><InfoCircle/></Input.IconAffix>}
                       onChange={handleChange} value={values.description}/>
            </FormField>

            <Input placeholder='End Date' type='date' size='large' id='endDate' name='endDate'
                   statusMessage={errors.endDate}
                   status={errors.endDate ? 'error' : undefined}
                   prefix={<Input.IconAffix><DateChecked/></Input.IconAffix>}
                   onChange={(event) => setFieldValue('endDate', new Date(event.target.value))}
            />

            <FormField labelId='PriorityFormField' id='prioity'>
                <RadioGroup display='horizontal' selectionArea='always' selectionAreaSkin='outlined' spacing='20px'
                            selectionAreaPadding='8px 10px' name='prioity' type='default'
                            fullWidth={true} value={values.priority}
                            onChange={(priority) => setFieldValue('priority', priority)}>
                    {TaskPriorities.map(priority =>
                        <RadioGroup.Radio key={priority} value={priority}>{startCase(priority)}</RadioGroup.Radio>
                    )}
                </RadioGroup>
            </FormField>

            <Button type='submit'>Done</Button>
        </Box>
    </form>;
};