export const PriorityLevels = {
    TOP_PRIORITY: {
        short: 'P0',
        name: 'Top Priority',
        level: 1,
        icon: {
            name: 'warning circle',
            color: 'red',
        },
    },
    PRIORITY_1: {
        short: 'P1',
        name: 'Priority 1',
        level: 2,
        icon: {
            name: 'angle double up',
            color: 'orange',
        },
    },
    PRIORITY_2: {
        short: 'P2',
        name: 'Priority 2',
        level: 3,
        icon: {
            name: 'angle double down',
            color: 'yellow',
        },
    },
    PRIORITY_3: {
        short: 'P3',
        name: 'Priority 3',
        level: 4,
        icon: {
            name: 'angle double down',
            color: 'blue',
        },
    },
    PRIORITY_4: {
        short: 'P4',
        name: 'Priority 4',
        level: 5,
        icon: {
            name: 'arrow down',
            color: 'green',
        },
    },
    BUG: {
        short: 'Bug',
        name: 'Bug',
        level: 6,
        icon: {
            name: 'bug',
            color: 'grey',
        },
    },
};

export const SeverityLevels = {
    CRITICAL: 'Critical',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    NA: 'N/A',
};

export const ComponentTypes = [
    'Network',
    'Camino',
    'eCampus',
    'Laptop',
    'Desktop',
    'Media Services',
    'Library',
    'CourseAvail',
];
