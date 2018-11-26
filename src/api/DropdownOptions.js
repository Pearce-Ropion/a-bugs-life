import { StatusTypes, ResolutionTypes } from './constants/Status';
import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket';
import { capitalize } from './Utils';

export const sortOptions = {
    summary: 'base',
    assignee: 'base',
    reporter: 'base',
    component: 'base',
    priority: 'level',
    severity: 'base',
    status: 'base',
    resolution: 'base',
    created: 'base',
    modified: 'base',
};

export const buildStaticOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option,
            text: option,
        };
    });
};

export const buildArrayOptions = options => {
    return options.map((option, idx) => {
        return {
            key: idx,
            value: option,
            text: option,
        };
    });
};

export const buildStatusOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option.name,
            text: option.name,
        };
    });
};

export const buildIconOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option.name,
            text: option.name,
            icon: option.icon,
        };
    });
};



export const sortDDoptions = () => {
    return Object.keys(sortOptions).map(key => {
        return {
            key,
            value: key,
            text: capitalize(key),
        };
    });
};

export default {
    StatusTypes: buildStatusOptions(StatusTypes),
    ResolutionTypes: buildStaticOptions(ResolutionTypes),
    PriorityLevels: buildIconOptions(PriorityLevels),
    SeverityLevels: buildStaticOptions(SeverityLevels),
    ComponentTypes: buildArrayOptions(ComponentTypes),
    SortingOptions: sortDDoptions(),
};

