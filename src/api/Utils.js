import _ from 'lodash';

import { StatusTypes } from "./constants/Status";
import { PriorityLevels } from "./constants/Ticket";
import { UserTypes } from "./constants/Users";

export const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));
export const getEpochTime = () => Math.round(new Date().getTime() / 1000);

export const sortByKey = (arr, key) => {
    return arr.sort((a, b) => {
        const componentA = a[key].toLowerCase();
        const componentB = b[key].toLowerCase();
        return componentA < componentB ? -1 : componentA > componentB ? 1 : 0;
    });
};


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

export const getStatus = status => StatusTypes[status.toUpperCase().replace(' ', '_')];
export const getPriority = priority => PriorityLevels[priority.toUpperCase().replace(' ', '_')];
export const getUser = user => UserTypes[user.toUpperCase().replace(' ', '_')];
