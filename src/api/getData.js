import faker from 'faker';
import axios from 'axios';

import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket'
import { StatusTypes, ResolutionTypes } from './constants/Status'
import { UserTypes } from './constants/Users'
import { capitalize } from './Utils';

const randomNumber = (min, max) => faker.random.number({ min, max });

const randomType = (obj, skip = 0) => {
    const values = Object.values(obj);
    const length = values.length;
    return values[Math.floor(Math.random() * (length - skip))];
}

const randomString = (count, fn) => new Array(count).fill(0).map(() => capitalize(fn()));
const randomDate = () => Math.round(new Date(randomNumber(2005, 2018), randomNumber(0, 11), randomNumber(0, 29), randomNumber(0, 23), randomNumber(0, 59)).getTime() / 1000);

export const getData = count => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            summary: faker.hacker.phrase(),
            description: faker.lorem.paragraph(5),
            assignee: UserTypes.USER.name,
            reporter: UserTypes.USER.name,
            component: ComponentTypes[Math.floor(Math.random() * ComponentTypes.length)],
            priority: PriorityLevels.BUG.name,
            severity: randomType(SeverityLevels),
            labels: randomString(3, faker.database.column),
            status: randomType(StatusTypes).name,
            resolution: randomType(ResolutionTypes),
            created: randomDate(),
            modified: randomDate(),
            closed: randomDate(),
        });
    };
    return data;
};

export const getTickets = async () => {
    return await axios.post('/api/tickets/all');
};

export const getUsers = async () => {
    return await axios.post('/api/users/all');
};
