/**
 * @file
 * @summary Enum representations for properties that reflect the status of a ticket
 */

/**
 * @export
 * @enum
 * @constant {Object} StatusTypes
 * @summary Enum representations of the different status types of a ticket
 */
export const StatusTypes = {
    OPEN: {
        type: Symbol('OPEN'),
        name: 'Open',
        color: 'blue',
    },
    IN_PROGRESS: {
        type: Symbol('IN_PROGRESS'),
        name: 'In Progress',
        color: 'yellow',
    },
    CLOSED: {
        type: Symbol('CLOSED'),
        name: 'Closed',
        color: 'green',
    },
    REOPENED: {
        type: Symbol('REOPENED'),
        name: 'Reopened',
        color: 'orange',
    },
    BLOCKED: {
        type: Symbol('BLOCKED'),
        name: 'Blocked',
        color: 'red',
    },
    CODE_COMPLETE: {
        type: Symbol('CODE_COMPLETE'),
        name: 'Code Complete',
        color: 'yellow',
    },
    BACKLOG: {
        type: Symbol('BACKLOG'),
        name: 'Backlog',
        color: 'blue',
    },
    VALIDATED: {
        type: Symbol('VALIDATED'),
        name: 'Validated',
        color: 'orange',
    },
    CODE_REVIEW: {
        type: Symbol('CODE_REVIEW'),
        name: 'Code Review',
        color: 'yellow',
    },
    TEST_READY: {
        type: Symbol('TEST_READY'),
        name: 'Test Ready',
        color: 'yellow',
    },
    TESTING: {
        type: Symbol('TESTING'),
        name: 'Testing',
        color: 'orange',
    },
    QA_TESTING: {
        type: Symbol('QA_TESTING'),
        name: 'QA Testing',
        color: 'orange',
    },
};

/**
 * @export
 * @enum
 * @constant {Object} ResolutionTypes
 * @summary Enum representations of the different resolution types of a ticket
 */
export const ResolutionTypes = {
    FIXED: 'Fixed',
    WONT_FIX: 'Wont Fix',
    DUPLICATE: 'Duplicate',
    INCOMPLETE: 'Incomplete',
    CANT_REPRODUCE: 'Cant Reproduce',
    DONE: 'Done',
    WONT_DO: 'Wont Do',
    NOT_A_BUG: 'Not A Bug',
    KILLED: 'Killed',
    APPROVED: 'Approved',
    NOT_APPROVED: 'Not Approved',
    UNRESOLVED: 'Unresolved',
};