/**
 * @file
 * @summary A set of funtions that is used to generate fake data and fetch all the available data from the database
 */

import faker from 'faker';
import axios from 'axios';
import moment from 'moment';

import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket'
import { StatusTypes, ResolutionTypes } from './constants/Status'
import { capitalize } from './Utils';

/**
 * @function randomNumber
 * @summary Generates a random number between the specefied parameters
 *
 * @param {Number} min - the minimum value of the random number (inclusive)
 * @param {Number} max - the maxium value of the random number (inclusive)
 * 
 * @returns {Number} Random number
 */
const randomNumber = (min, max) => faker.random.number({ min, max });

/**
 * @function randomType
 * @summary Generates a random enum type from the object specified
 * 
 * @param {Object} obj - the object to get a random type from
 * 
 * @returns {Object|String} Randomized type
 */
const randomType = obj => {
    const values = Object.values(obj);
    const length = values.length;
    return values[Math.floor(Math.random() * length)];
}

/**
 * @function randomString
 * @summary Generates an array of randomized strings with a given randomizer
 * 
 * @param {Number} count - the length of the array to return
 * @param {Function} fn - the function to call when generating a string
 * 
 * @returns {Array} Array of length count with randomized strings
 */
const randomString = (count, fn) => new Array(count).fill(0).map(() => capitalize(fn()));

/**
 * @function randomDate
 * @summary Generates a random date object
 * @typedef {Object} Moment
 * 
 * @returns {Moment} Moment object which can be further manipulated
 */
const randomDate = () => moment(new Date(randomNumber(2005, 2018), randomNumber(0, 10), randomNumber(0, 24), randomNumber(0, 23), randomNumber(0, 59)));

/**
 * @export
 * @function genData
 * @summary Generates a randomized ticket with all appropriate properties
 * @typedef {Object} Ticket
 * 
 * @returns {Ticket} Generated ticket
 */
export const genData = () => {
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

/**
 * @export
 * @async
 * @function getTickets
 * @summary Gets all the tickets from the database
 * 
 * @returns {Array} All tickets
 */
export const getTickets = async () => {
    return await axios.post('/api/tickets/all');
};

/**
 * @export
 * @async
 * @function getUsers
 * @summary Gets all the users from the database
 * 
 * @returns {Array} All users
 */
export const getUsers = async () => {
    return await axios.post('/api/users/all');
};
