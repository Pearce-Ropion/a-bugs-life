/**
 * @file
 * @summary A set of utility functions used accross multiple components
 */

import _ from 'lodash';
import moment from 'moment';

import { StatusTypes } from "./constants/Status";
import { PriorityLevels } from "./constants/Ticket";
import { UserTypes } from "./constants/Users";

/**
 * @export
 * @function capitalize
 * @summary Capitalizes the fist character of a string
 * 
 * @param {String} str - the string to capitalize 
 * 
 * @returns {String} Capitalized string
 */
export const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));

/**
 * @export
 * @function getEpochTime
 * @summary Gets the current time in unix epoch format
 * 
 * @returns {Number} epoch time stamp
 */
export const getEpochTime = () => moment().unix();

/**
 * @export
 * @function sortByKey
 * @summary Sorts an array by a specified key within an object
 * 
 * @param {Array} arr - the array to sort
 * @param {String} key - the key to sort by
 * 
 * @returns {Array} Sorted Array
 */
export const sortByKey = (arr, key) => {
    return arr.sort((a, b) => {
        const componentA = a[key].toLowerCase();
        const componentB = b[key].toLowerCase();
        return componentA < componentB ? -1 : componentA > componentB ? 1 : 0;
    });
};

/**
 * @export
 * @function sqlNormalizeTicket
 * @summary Normalizes the output fields of a ticket for sql injection
 * 
 * @param {Boolean} isUpdate - whether this is an update of the ticket
 * @param {Ticket} fields - the fields to normalize
 * 
 * @returns {Object} Normalized fields
 */
export const sqlNormalizeTicket = (isUpdate, fields) => {
    return {
        id: isUpdate ? fields.id : null,
        summary: fields.summary,
        description: fields.description,
        comments: fields.comments,
        assignee: fields.assignee,
        reporter: fields.reporter,
        component: fields.component,
        priority: fields.priority,
        severity: fields.severity,
        labels: fields.labels,
        status: fields.status,
        resolution: fields.resolution,
        created: isUpdate ? fields.created : getEpochTime(),
        modified: getEpochTime(),
        closed: fields.status === 'Closed' ? getEpochTime() : fields.closed,
    };
};

/**
 * @export
 * @function sqlNormalizeUser
 * @summary Normalizes the output fields of a user for sql injection
 * 
 * @param {Boolean} isUpdate - whether this is an update of the user
 * @param {User} fields - the fields to normalize
 * 
 * @returns {Object} Normalized fields
 */
export const sqlNormalizeUser = (isUpdate, fields) => {
    const user = {
        id: isUpdate ? fields.id : null,
        name: isUpdate ? fields.name : fields.firstname.concat(' ', fields.lastname),
        email: fields.email,
        role: fields.role.name,
    };
    return isUpdate ? user : {
        ...user,
        password: fields.password,
    };
};

/**
 * @export
 * @constant {Object} getTicketKey
 * @summary Function wrapper so that inner functions can be called in a loop
 */
export const getTicketKey = {
    status: status => StatusTypes[status.toUpperCase().replace(' ', '_')],
    priority: priority => PriorityLevels[priority.toUpperCase().replace(' ', '_')],
};

/**
 * @export
 * @function getStatus
 * @summary Gets the status ENUM given its name
 * 
 * @param {String} status - the status to get the corresponding object for
 * 
 * @returns {Object} Status Object
 */
export const getStatus = status => StatusTypes[status.toUpperCase().replace(' ', '_')];

/**
 * @export
 * @function getPriority
 * @summary Gets the priority ENUM given its name
 * 
 * @param {String} priority - the priority to get the corresponding object for
 * 
 * @returns {Object} Priority Object
 */
export const getPriority = priority => PriorityLevels[priority.toUpperCase().replace(' ', '_')];

/**
 * @export
 * @function getRole
 * @summary Gets the role ENUM given its name
 * 
 * @param {String} role - the role to get the corresponding object for
 * 
 * @returns {Object} Role Object
 */
export const getRole = role => UserTypes[role.toUpperCase().replace(' ', '_')];
