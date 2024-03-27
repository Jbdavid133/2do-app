import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {CreateTaskFormDriver} from '@/app/components/forms/CreateTaskForm/__tests__/CreateTaskForm.driver';
import {ValidationMessage} from '@/app/components/forms/CreateTaskForm/constants/validation-messages.constants';
import {NewTask, TaskPriority} from '@/app/components/forms/CreateTaskForm/CreateTaskForm.types';
import {Mock} from 'jest-mock';
import moment from 'moment/moment';

describe('Create task form', () => {
    let onSubmit: Mock;
    let createTaskFormDriver: CreateTaskFormDriver;

    beforeEach(() => {
        onSubmit = jest.fn();
        createTaskFormDriver = new CreateTaskFormDriver();
        createTaskFormDriver.given.onSubmit(onSubmit).when.rendered();
    });

    it('Should not call submit and show errors when form is empty', async () => {
        await createTaskFormDriver.when.submit();

        expect(onSubmit).not.toHaveBeenCalled();

        expect(await createTaskFormDriver.get.titleFormField().hasStatus('error')).toBeTruthy();
        expect(await createTaskFormDriver.get.descriptionFormField().hasStatus('error')).toBeTruthy();

        expect(await createTaskFormDriver.get.titleFormField().getStatusMessage()).toEqual(ValidationMessage.RequiredTitle);
        expect(await createTaskFormDriver.get.descriptionFormField().getStatusMessage()).toEqual(ValidationMessage.RequiredDescription);

    });

    it('Should not call submit when title is too long', async () => {
        await createTaskFormDriver.when.enterTitle(false);
        await createTaskFormDriver.when.submit();

        expect(onSubmit).not.toHaveBeenCalled();

        expect(await createTaskFormDriver.get.titleFormField().hasStatus('error')).toBeTruthy();
        expect(await createTaskFormDriver.get.titleFormField().getStatusMessage()).toEqual(ValidationMessage.LongTitle);
    });

    it('Should not call submit when description is too long', async () => {
        await createTaskFormDriver.when.enterDescription(false);
        await createTaskFormDriver.when.submit();

        expect(onSubmit).not.toHaveBeenCalled();

        expect(await createTaskFormDriver.get.descriptionFormField().hasStatus('error')).toBeTruthy();
        expect(await createTaskFormDriver.get.descriptionFormField().getStatusMessage()).toEqual(ValidationMessage.LongDescription);
    });

    it('Should call submit with default values', async () => {
        await createTaskFormDriver.when.enterTitle();
        await createTaskFormDriver.when.enterDescription();
        await createTaskFormDriver.when.submit();

        const expectedResult: NewTask = {
            priority: 'none',
            endDate: undefined,
            title: await createTaskFormDriver.get.titleInput().getValue(),
            description: await createTaskFormDriver.get.descriptionInput().getValue(),
        };

        expect(onSubmit).toHaveBeenCalledWith(expectedResult, expect.anything());
    });

    it('Should call submit when all form fields are filled', async () => {
        await createTaskFormDriver.when.enterTitle();
        await createTaskFormDriver.when.enterEndDate();
        await createTaskFormDriver.when.changePriority();
        await createTaskFormDriver.when.enterDescription();
        await createTaskFormDriver.when.submit();

        const expectedResult: NewTask = {
            title: await createTaskFormDriver.get.titleInput().getValue(),
            description: await createTaskFormDriver.get.descriptionInput().getValue(),
            priority: await createTaskFormDriver.get.priorityRadioGroup().getSelectedValue() as TaskPriority,
            endDate: moment(await createTaskFormDriver.get.endDateInput().getValue(), 'yyyy-MM-DD').toDate(),
        };

        expect(onSubmit).toHaveBeenCalledWith(expectedResult, expect.anything());
    });
});