export const StatusTypes = {
    OPEN: {
        type: Symbol('OPEN'),
        value: 'Open',
        color: 'blue',
    },
    IN_PROGRESS: {
        type: Symbol('IN_PROGRESS'),
        value: 'In Progress',
        color: 'yellow',
    },
    RESOLVED: {
        type: Symbol('RESOLVED'),
        value: 'Resolved',
        color: 'green',
    },
    CLOSED: {
        type: Symbol('CLOSED'),
        value: 'Closed',
        color: 'green',
    },
    REOPENED: {
        type: Symbol('REOPENED'),
        value: 'Reopened',
        color: 'blue',
    },
    BLOCKED: {
        type: Symbol('BLOCKED'),
        value: 'Blocked',
        color: 'yellow',
    },
    CODE_COMPLETE: {
        type: Symbol('CODE_COMPLETE'),
        value: 'Code Complete',
        color: 'yellow',
    },
    BACKLOG: {
        type: Symbol('BACKLOG'),
        value: 'Backlog',
        color: 'blue',
    },
    ON_HOLD: {
        type: Symbol('ON_HOLD'),
        value: 'On Hold',
        color: 'blue',
    },
    CODE_REVIEW: {
        type: Symbol('CODE_REVIEW'),
        value: 'Code Review',
        color: 'yellow',
    },
    TESTING: {
        type: Symbol('TESTING'),
        value: 'Testing',
        color: 'orange',
    },
    QA_TESTING: {
        type: Symbol('QA_TESTING'),
        value: 'QA Testing',
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
};