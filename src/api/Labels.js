import PropTypes from 'prop-types';

import { sortByKey, capitalize } from './Utils';

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

export const LabelProps = PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    labelDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string,
    })),
});

export const displayLabel = error => {
    return {
        display: error ? 'inline-block' : 'none',
    };
};