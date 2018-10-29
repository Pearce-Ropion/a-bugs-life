import PropTypes from 'prop-types';

import { PriorityLevels, SeverityLevels } from './Ticket';
import { StatusTypes, ResolutionTypes } from './Status';

export default {
    id: PropTypes.number,
    summary: PropTypes.string,
    description: PropTypes.string,
    assignee: PropTypes.shape({
        type: PropTypes.symbol,
        name: PropTypes.string,
    }),
    reporter: PropTypes.shape({
        type: PropTypes.symbol,
        name: PropTypes.string,
    }),
    watchers: PropTypes.arrayOf(PropTypes.string),
    component: PropTypes.string,
    priority: PropTypes.oneOf(Object.values(PriorityLevels)),
    severity: PropTypes.oneOf(Object.values(SeverityLevels)),
    labels: PropTypes.arrayOf(PropTypes.string),
    attachments: PropTypes.arrayOf(PropTypes.number),
    status: PropTypes.oneOf(Object.values(StatusTypes)),
    resolution: PropTypes.oneOf(Object.values(ResolutionTypes)),
    created: PropTypes.date,
    modified: PropTypes.date,
    closed: PropTypes.date,
};
