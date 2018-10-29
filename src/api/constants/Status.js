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
    RESOLVED: {
        type: Symbol('RESOLVED'),
        name: 'Resolved',
        color: 'green',
    },
    CLOSED: {
        type: Symbol('CLOSED'),
        name: 'Closed',
        color: 'green',
    },
    REOPENED: {
        type: Symbol('REOPENED'),
        name: 'Reopened',
        color: 'blue',
    },
    BLOCKED: {
        type: Symbol('BLOCKED'),
        name: 'Blocked',
        color: 'yellow',
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
    ON_HOLD: {
        type: Symbol('ON_HOLD'),
        name: 'On Hold',
        color: 'blue',
    },
    CODE_REVIEW: {
        type: Symbol('CODE_REVIEW'),
        name: 'Code Review',
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

export const ResolutionTypes = {
    FIXED: 'Fixed',
    WONT_FIX: 'Won\'t Fix',
    DUPLICATE: 'Duplicate',
    INCOMPLETE: 'Incomplete',
    CANT_REPRODUCE: 'Can\'t Reproduce',
    DONE: 'Done',
    WONT_DO: 'Won\'t Do',
    NOT_A_BUG: 'Not A Bug',
    KILLED: 'Killed',
    APPROVED: 'Approved',
    NOT_APPROVED: 'Not Approved',
    UNRESOLVED: 'Unresolved',
};