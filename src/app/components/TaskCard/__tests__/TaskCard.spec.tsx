import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {TaskCard} from '@/app/components/TaskCard/TaskCard';
import {TaskCardDriver} from '@/app/components/TaskCard/__tests__/TaskCard.driver';
import {Chance} from 'chance';
import moment from 'moment/moment';

describe(TaskCard.name, () => {
    let taskCardDriver: TaskCardDriver;
    const chance = new Chance();

    beforeEach(() => {
        taskCardDriver = new TaskCardDriver();
    });

    it('Should not show all default values', async () => {
        const title = chance.string();
        const description = chance.string();
        const creationDate = moment(chance.date());

        taskCardDriver.given.title(title)
            .given.description(description)
            .given.creationDate(creationDate.toDate())
            .given.endDate(undefined)
            .when.rendered();

        await expect(taskCardDriver.get.badge().exists()).resolves.toBeFalsy();
        await expect(taskCardDriver.get.endDateHeading().exists()).resolves.toBeFalsy();
        await expect(taskCardDriver.get.title()).resolves.toEqual(title);
        await expect(taskCardDriver.get.description()).resolves.toEqual(description);
        await expect(taskCardDriver.get.creationDateHeading().getText()).resolves.toEqual(`Created on ${creationDate.format('DD.MM.yyyy')}`);
    });

    it('Should show correct badge for low priority task', async () => {
        taskCardDriver.given.priority('low').when.rendered();

        const priorityBadgeText = await taskCardDriver.get.badge().text();
        const priorityBadgeExists = await taskCardDriver.get.badge().exists();
        const priorityBadgeSkin = await taskCardDriver.get.badge().getSkin();

        expect(priorityBadgeExists).toBeTruthy();
        expect(priorityBadgeText).toEqual('low');
        expect(priorityBadgeSkin).toEqual('standard');
    });

    it('Should show correct badge for medium priority task', async () => {
        taskCardDriver.given.priority('medium').when.rendered();

        const priorityBadgeText = await taskCardDriver.get.badge().text();
        const priorityBadgeExists = await taskCardDriver.get.badge().exists();
        const priorityBadgeSkin = await taskCardDriver.get.badge().getSkin();

        expect(priorityBadgeExists).toBeTruthy();
        expect(priorityBadgeText).toEqual('medium');
        expect(priorityBadgeSkin).toEqual('warning');
    });

    it('Should show correct badge for high priority task', async () => {
        taskCardDriver.given.priority('high').when.rendered();

        const priorityBadgeText = await taskCardDriver.get.badge().text();
        const priorityBadgeExists = await taskCardDriver.get.badge().exists();
        const priorityBadgeSkin = await taskCardDriver.get.badge().getSkin();

        expect(priorityBadgeExists).toBeTruthy();
        expect(priorityBadgeText).toEqual('high');
        expect(priorityBadgeSkin).toEqual('danger');
    });

    it('Should show end date', async () => {
        const endDate = moment(chance.date());
        taskCardDriver.given.endDate(endDate.toDate()).when.rendered();

        await expect(taskCardDriver.get.endDateHeading().getText()).resolves.toEqual(`Expires on ${endDate.format('DD.MM.yyyy')}`);
    });

    it('Should call onDelete when clicking the delete button', async () => {
        const onDeleteMock = jest.fn();

        taskCardDriver.given.onDelete(onDeleteMock).when.rendered();
        await taskCardDriver.when.deleteButtonClicked();

        expect(onDeleteMock).toHaveBeenCalled();
    });
});