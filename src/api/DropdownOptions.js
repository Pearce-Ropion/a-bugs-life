import { StatusTypes, ResolutionTypes } from './constants/Status';
import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket';

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
            value: option.value,
            text: option.value,
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

export default {
    StatusTypes: buildStatusOptions(StatusTypes),
    ResolutionTypes: buildStaticOptions(ResolutionTypes),
    PriorityLevels: buildIconOptions(PriorityLevels),
    SeverityLevels: buildStaticOptions(SeverityLevels),
    ComponentTypes: buildArrayOptions(ComponentTypes),
};

