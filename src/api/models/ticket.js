/**
 * @file
 * @summary Ticket factory object creators
 */

/**
 * @export
 * @function getType
 * @summary Gets the enum representation given a provided string within an object set
 *
 * @param {String|Object} value - the value to fetch the enum for 
 * @param {Object} type - the object set to fetch from
 * 
 * @returns {Enum<Object|String>} The retrieved enum
 */
export const getType = (value, type) => {
    // console.log('mark', value);
    const next = typeof value === 'object' ? value.name : value
    return type[next.toUpperCase().replace(' ', '_')];
}

/**
 * @export
 * @function ticketFields
 * @summary A field factory for creating all the required fields of a ticket
 * @typedef {Object} Ticket
 *
 * @param {Object} params - the available params
 * @property {Null|Number} [params.id = null] - the ticket id
 * @property {String} [params.summary = ''] - the ticket summary
 * @property {String} [params.description = ''] - the ticket description
 * @property {String} [params.comments = ''] - the ticket comments
 * @property {String} [params.assignee = 'Manager'] - the ticket assignee
 * @property {String} [params.reporter = 'Anonymous'] - the ticket reporter
 * @property {String} [params.component = ''] - the ticket component
 * @property {String} [params.priority = 'Bug'] - the ticket priority
 * @property {String} [params.severity = 'Medium'] - the ticket severity
 * @property {Array} [params.labels = []] - the ticket labels
 * @property {String} [params.status = 'Open'] - the ticket status
 * @property {String} [params.resolution = 'Unresolved'] - the ticket resolution status
 * @property {Null|Number} [params.created = null] - the ticket created date
 * @property {Null|Number} [params.modified = null] - the ticket modified date
 * @property {Null|Number} [params.closed = null] - the ticket closed date
 * 
 * @returns {Object} Ticket fields
 */
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

/**
 * @export
 * @function ticketFieldErrors
 * @summary A field factory for creating all the required fields error states of a ticket
 *
 * @param {Object} params - the available params
 * @property {Null} [params.id = null] - the ticket id
 * @property {Boolean} [params.summary = false] - the ticket summary
 * @property {Boolean} [params.description = false] - the ticket description
 * @property {Boolean} [params.comments = false] - the ticket comments
 * @property {Boolean} [params.assignee = false] - the ticket assignee
 * @property {Boolean} [params.reporter = false] - the ticket reporter
 * @property {Boolean} [params.component = false] - the ticket component
 * @property {Boolean} [params.priority = false] - the ticket priority
 * @property {Boolean} [params.severity = false] - the ticket severity
 * @property {Boolean} [params.labels = false] - the ticket labels
 * @property {Boolean} [params.status = false] - the ticket status
 * @property {Boolean} [params.resolution = false] - the ticket resolution status
 * @property {Boolean} [params.created = false] - the ticket created date
 * @property {Boolean} [params.modified = false] - the ticket modified date
 * @property {Boolean} [params.closed = false] - the ticket closed date
 * 
 * @returns {Object} Ticket Field's Error State
 */
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