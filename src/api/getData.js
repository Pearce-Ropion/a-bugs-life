import faker from 'faker';

import { PriorityLevels, SeverityLevels } from './constants/Ticket'
import { StatusTypes, ResolutionTypes } from './constants/Status'

const randomType = obj => {
    const values = Object.values(obj);
    const length = values.length;
    return values[Math.floor(Math.random() * length)];
}

const randomString = (count, string) => new Array(count).fill(0).map(() => string);

export const getData = count => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            summary: faker.hacker.phrase(),
            description: faker.lorem.paragraph(3),
            assignee: faker.name.firstName().concat(' ', faker.name.lastName()),
            reporter: faker.name.firstName().concat(' ', faker.name.lastName()),
            watchers: randomString(3, faker.name.firstName().concat(' ', faker.name.lastName())),
            components: randomString(3, faker.commerce.department()),
            priority: PriorityLevels.BUG,
            severity: randomType(SeverityLevels),
            labels: randomString(3, faker.database.column()),
            attachments: [],
            status: randomType(StatusTypes),
            resolution: randomType(ResolutionTypes),
            dateCreated: new Date(),
            dateModified: new Date(),
            dateClosed: new Date(),
        });
    };
    return data;
};
