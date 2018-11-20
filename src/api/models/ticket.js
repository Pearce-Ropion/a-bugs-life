export const getType = (value, type) => {
    // console.log('mark', value);
    const next = typeof value === 'object' ? value.name : value
    return type[next.toUpperCase().replace(' ', '_')];
}

export const ticketFields = ({
    id = null,
    summary = '',
    description = '',
    comments = '',
    assignee = 'Manager',
    reporter = 'Anonymous',
    component = '',
    priority = 'Bug',
    severity = 'Medium',
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
        comments,
        assignee,
        reporter,
        component,
        priority,
        severity,
        labels,
        status,
        resolution,
        created,
        modified,
        closed,
    };
};

export const ticketFieldErrors = ({
    id = null,
    summary = false,
    description = false,
    comments = false,
    assignee = false,
    reporter = null,
    component = false,
    priority = false,
    severity = false,
    labels = null,
    status = false,
    resolution = false,
    created = null,
    modified = null,
    closed = null,
}) => {
    return {
        id,
        summary,
        description,
        comments,
        assignee,
        reporter,
        component,
        priority,
        severity,
        labels,
        status,
        resolution,
        created,
        modified,
        closed,
    };
};