import { UserTypes } from '../constants/Users';
import { PriorityLevels, SeverityLevels } from '../constants/Ticket';
import { StatusTypes, ResolutionTypes } from '../constants/Status';

export const getType = (value, type) => {
    // console.log('mark', value);
    const next = typeof value === 'object' ? value.name : value
    return type[next.toUpperCase().replace(' ', '_')];
}

export const ticketFields = ({
    id = null,
    summary = '',
    description = '',
    assignee = 'Manager',
    reporter = 'User',
    component = '',
    priority = 'Bug',
    serverity = 'Medium',
    labels = [],
    status = 'Open',
    resolution = 'Unresolved',
    created = null,
    modified = null,
    closed = null,
}) => {
    return {
        id,
        summary,
        description,
        assignee: getType(assignee, UserTypes),
        reporter: getType(reporter, UserTypes),
        component,
        priority: getType(priority, PriorityLevels),
        serverity,
        labels,
        status: getType(status, StatusTypes),
        resolution,
        created,
        modified,
        closed,
    }
};