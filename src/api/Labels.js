/**
 * @file
 * @summary A set of funtions that is used to generate labels and things related to labels
 */

import PropTypes from 'prop-types';

import { sortByKey, capitalize } from './Utils';

/**
 * @export
 * @function getAllLabels
 * @summary Generates a list of all the existing labels in the database and creates dropdown options for them
 * 
 * @param {Array} tickets - the available tickets
 * 
 * @returns {Object} All the labels
 */
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

/**
 * @export
 * @constant LabelProps
 * @summary The property types of the label object
 */
export const LabelProps = PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    labelDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string,
    })),
});

/**
 * @export
 * @function displayLabel
 * @summary Whether to display the label
 * 
 * @param {Boolean} error 
 * 
 * @returns {String} the value of the display CSS proeprty
 */
export const displayLabel = error => {
    return {
        display: error ? 'inline-block' : 'none',
    };
};