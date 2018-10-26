import { UserTypes } from '../constants/Users';
import { PriorityLevels, SeverityLevels } from '../constants/Ticket';
import { StatusTypes, ResolutionTypes } from '../constants/Status';
import { getEpochTime } from '../Utils';

export const ticketFields = ({
    id = null,
    summary = '',
    description = '',
    assignee = UserTypes.MANAGER,
    reporter = UserTypes.USER,
    watchers = [],
    component = '',
    priority = PriorityLevels.BUG,
    serverity = SeverityLevels.MEDIUM,
    labels = [],
    attachments = [],
    status = StatusTypes.OPEN,
    resolution = ResolutionTypes.UNRESOLVED,
    created = getEpochTime(),
    modified = getEpochTime(),
    closed = null,
}) => {
    return {
        id,
        summary,
        description,
        assignee,
        reporter,
        watchers,
        component,
        priority,
        serverity,
        labels,
        attachments,
        status,
        resolution,
        created,
        modified,
        closed,
    }
};