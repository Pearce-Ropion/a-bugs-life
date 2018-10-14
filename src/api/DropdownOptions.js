import { StatusTypes, ResolutionTypes } from './constants/Status';
import { TicketTypes, PriorityLevels, SeverityLevels } from './constants/Ticket';


export const buildStaticOptions = options => {
    return Object.values(options).map((option, idx) => {
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
    TicketTypes: buildIconOptions(TicketTypes),
    PriorityLevels: buildIconOptions(PriorityLevels),
    SeverityLevels: buildStaticOptions(SeverityLevels),
};

