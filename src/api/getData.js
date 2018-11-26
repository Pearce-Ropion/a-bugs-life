import faker from 'faker';
import axios from 'axios';
import moment from 'moment';

import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket'
import { StatusTypes, ResolutionTypes } from './constants/Status'
import { capitalize } from './Utils';

const randomNumber = (min, max) => faker.random.number({ min, max });

const randomType = (obj, skip = 0) => {
    const values = Object.values(obj);
    const length = values.length;
    return values[Math.floor(Math.random() * (length - skip))];
}

const randomString = (count, fn) => new Array(count).fill(0).map(() => capitalize(fn()));
const randomDate = () => moment(new Date(randomNumber(2005, 2018), randomNumber(0, 11), randomNumber(0, 29), randomNumber(0, 23), randomNumber(0, 59)));

export const getData = () => {
    const date = randomDate();
    const modifyDate = randomNumber(1, 100) > 20 ? date.add(randomNumber(1, 5), 'days') : date;
    const isClosed = randomNumber(1, 100) > 80;
    let status = '', resolution = '';
    while (status === 'Closed' || status === '') {
        status = randomType(StatusTypes).name;
    }
    while (resolution === 'Unresolved' || resolution === '') {
        resolution = randomType(ResolutionTypes);
    }
    return {
        summary: faker.hacker.phrase(),
        description: faker.lorem.paragraph(3),
        comments: faker.lorem.sentences(3),
        assignee: 'Pearce Ropion',
        reporter: faker.name.firstName().concat(' ', faker.name.lastName()),
        component: ComponentTypes[Math.floor(Math.random() * ComponentTypes.length)],
        priority: randomType(PriorityLevels).name,
        severity: randomType(SeverityLevels),
        labels: randomString(3, faker.lorem.word),
        status: isClosed ? 'Closed' : status,
        resolution: isClosed ? resolution : 'Unresolved',
        created: date.unix(),
        modified: modifyDate.unix(),
        closed: isClosed ? modifyDate.add(randomNumber(1, 5), 'days').unix() : null,
    };
};

export const getTickets = async () => {
    return await axios.post('/api/tickets/all');
};

export const getUsers = async () => {
    return await axios.post('/api/users/all');
};
