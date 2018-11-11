import PropTypes from 'prop-types';

export default {
    id: PropTypes.number,
    summary: PropTypes.string,
    description: PropTypes.string,
    assignee: PropTypes.string,
    reporter: PropTypes.string,
    component: PropTypes.string,
    priority: PropTypes.string,
    severity: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    attachments: PropTypes.string,
    status: PropTypes.string,
    resolution: PropTypes.string,
    created: PropTypes.number,
    modified: PropTypes.number,
    closed: PropTypes.number,
};
