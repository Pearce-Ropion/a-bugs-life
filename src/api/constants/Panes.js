/**
 * @file
 * @summary Enum representations for the types of windows and ticket views
 */

/**
 * @export
 * @enum
 * @constant {Object} Panes
 * @summary Enum representations of the different window types that an actor can see
 */
export const Panes = {
    CREATE: Symbol('Create'),
    DETAILS: Symbol('Details'),
    USERS: Symbol('Users'),
    DASHBOARD: Symbol('Dashboard'),
    REPORT: Symbol('Report'),
};

/**
 * @export
 * @enum
 * @constant {Object} TicketViews
 * @summary Enum representations of the different ticket sets types that an actor can see
 */
export const TicketViews = {
    ALL: Symbol('All'),
    ASSIGNED: Symbol('Assgined'),
    REPORTED: Symbol('Reported'),
    NONE: Symbol('None'),
}