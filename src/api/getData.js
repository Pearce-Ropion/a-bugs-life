import faker from 'faker';

import { TicketTypes, PriorityLevels, SeverityLevels } from './constants/Ticket'
import { StatusTypes } from './constants/Status'

export const getData = count => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            project: faker.commerce.product(),
            type: Object.values(TicketTypes)[Math.floor(Math.random() * Object.keys(TicketTypes).length)],
            summary: faker.lorem.sentence(),
            description: faker.lorem.paragraph(3),
            assignee: faker.name.firstName().concat(' ', faker.name.lastName()),
            reporter: faker.name.firstName().concat(' ', faker.name.lastName()),
            watchers: new Array(3).fill(0).map(val => faker.name.firstName().concat(' ', faker.name.lastName())),
            components: new Array(3).fill(0).map(val => faker.commerce.department()),
            epic: faker.finance.account(),
            priority: Object.values(PriorityLevels)[Math.floor(Math.random() * Object.keys(PriorityLevels).length)],
            severity: Object.values(SeverityLevels)[Math.floor(Math.random() * Object.keys(SeverityLevels).length)],
            labels: new Array(3).fill(0).map(val => faker.database.column()),
            attachments: [],
            status: Object.values(StatusTypes)[Math.floor(Math.random() * Object.keys(SeverityLevels).length)],
            dateCreated: new Date(),
            dateModified: new Date(),
            dateClosed: new Date(),
        })
    }
    return data;
}