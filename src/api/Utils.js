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
}