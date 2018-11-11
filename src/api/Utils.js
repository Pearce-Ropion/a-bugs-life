import { StatusTypes } from "./constants/Status";
import { PriorityLevels } from "./constants/Ticket";
import { UserTypes } from "./constants/Users";

export const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));
export const getEpochTime = () => Math.round(new Date().getTime() / 1000);

export const sortByKey = (arr, key) => {
    return arr.sort((a, b) => {
        const componentA = a[key].toLowerCase();
        const componentB = b[key].toLowerCase();
        return componentA < componentB ? -1 : componentA > componentB ? 1 : 0;
    });
};

export const getAllLabels = tickets => {
    const labels = [];
    tickets.forEach(ticket => {
        ticket.labels.forEach(label => {
            labels.push(capitalize(label));
        });
    });
    const unique = [...new Set(labels)];
    const tempOptions = unique.map((label, idx) => {
        return {
            key: `label-${idx}`,
            value: label,
            text: label,
        };
    });

    const labelDropdownOptions = sortByKey(tempOptions, 'value');
    return {
        labels,
        labelDropdownOptions,
    }
};

export const displayLabel = error => {
    return {
        display: error ? 'inline-block' : 'none',
    };
};

export const sqlNormalizeTicket = (isUpdate, fields) => {
    return {
        id: isUpdate ? fields.id : null,
        summary: fields.summary,
        description: fields.description,
        assignee: fields.assignee.name,
        reporter: fields.reporter.name,
        component: fields.component,
        priority: fields.priority.name,
        severity: fields.serverity,
        labels: fields.labels,
        attachments: fields.attachments,
        status: fields.status.name,
        resolution: fields.resolution,
        created: isUpdate ? fields.created : getEpochTime(),
        modified: getEpochTime(),
        closed: fields.status.name === 'Closed' ? getEpochTime() : fields.closed,
    }
};

export const sqlNormalizeUser = (isUpdate, fields) => {
    return {
        id: isUpdate ? fields.id : null,
        name: isUpdate ? fields.name : fields.firstname.concat(' ', fields.lastname),
        email: fields.email,
        password: fields.password,
        role: fields.role.name,
    }
}

export const getStatus = status => StatusTypes[status.toUpperCase().replace(' ', '_')];
export const getPriority = priority => PriorityLevels[priority.toUpperCase().replace(' ', '_')];
export const getUser = user => UserTypes[user.toUpperCase().replace(' ', '_')];
