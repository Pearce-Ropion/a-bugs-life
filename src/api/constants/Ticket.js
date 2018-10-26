export const PriorityLevels = {
    P0: {
        short: 'P0',
        name: 'Top Priority',
        icon: {
            name: 'warning circle',
            color: 'red',
        },
    },
    P1: {
        short: 'P1',
        name: 'Priority 1',
        icon: {
            name: 'angle up',
            color: 'orange',
        },
    },
    P2: {
        short: 'P2',
        name: 'Priority 2',
        icon: {
            name: 'angle down',
            color: 'yellow',
        },
    },
    P3: {
        short: 'P3',
        name: 'Priority 3',
        icon: {
            name: 'angle double down',
            color: 'blue',
        },
    },
    P4: {
        short: 'P4',
        name: 'Priority 4',
        icon: {
            name: 'arrow down',
            color: 'green',
        },
    },
    BUG: {
        short: 'Bug',
        name: 'Bug',
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
