import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {CreateTaskFormDriver} from '@/app/components/forms/CreateTaskForm/__tests__/CreateTaskForm.driver';
import {ValidationMessage} from '@/app/components/forms/CreateTaskForm/constants/validation-messages.constants';
import {Mock} from 'jest-mock';
import {Chance} from 'chance';
import {TaskPriorities} from '@/app/tasks/types/task-priority.types';
import {NewTask} from '@/app/tasks/types/task.types';
import moment from 'moment/moment';

describe('Create task form', () => {
    const chance = new Chance();

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
        const title = chance.string().repeat(30);
        await createTaskFormDriver.when.enterTitle(title);

        await createTaskFormDriver.when.submit();

        expect(onSubmit).not.toHaveBeenCalled();

        expect(await createTaskFormDriver.get.titleFormField().hasStatus('error')).toBeTruthy();
        expect(await createTaskFormDriver.get.titleFormField().getStatusMessage()).toEqual(ValidationMessage.LongTitle);
    });

    it('Should not call submit when description is too long', async () => {
        const description = chance.string().repeat(50);
        await createTaskFormDriver.when.enterDescription(description);

        await createTaskFormDriver.when.submit();

        expect(onSubmit).not.toHaveBeenCalled();

        expect(await createTaskFormDriver.get.descriptionFormField().hasStatus('error')).toBeTruthy();
        expect(await createTaskFormDriver.get.descriptionFormField().getStatusMessage()).toEqual(ValidationMessage.LongDescription);
    });

    it('Should call submit with default values', async () => {
        const title = chance.string();
        await createTaskFormDriver.when.enterTitle(title);

        const description = chance.string();
        await createTaskFormDriver.when.enterDescription(description);

        await createTaskFormDriver.when.submit();

        const expectedResult: NewTask = {title, description, priority: 'none', endDate: undefined};

        expect(onSubmit).toHaveBeenCalledWith(expectedResult, expect.anything());
    });

    it('Should call submit when all form fields are filled', async () => {
        const title = chance.string();
        await createTaskFormDriver.when.enterTitle(title);

        const endDate = moment(chance.date()).startOf('day').toDate();
        await createTaskFormDriver.when.enterEndDate(endDate);

        const priority = chance.pickone([...TaskPriorities]);
        await createTaskFormDriver.when.changePriority(priority);

        const description = chance.string();
        await createTaskFormDriver.when.enterDescription(description);

        await createTaskFormDriver.when.submit();

        const expectedResult: NewTask = {
            title,
            description,
            priority,
            endDate
        };

        expect(onSubmit).toHaveBeenCalledWith(expectedResult, expect.anything());
    });
});