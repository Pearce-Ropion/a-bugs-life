/**
 * @file
 * @summary Creates the Ticket Sorter Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Dropdown } from 'semantic-ui-react';

/**
 * @export
 * @function TicketSorter
 * @summary Implements sorting of tickets and the dropdown component that controls what to sort by
 * 
 * @param {Object} props - the available props
 * @property {String} props.sortCategory - the category to sory by
 * @property {Array} props.categoryOptions - the drop down options
 * @property {Function} props.onSortChange - an event handler to update the list when a new category is selected
 * 
 * @returns {FSC} <TicketSorter />
 */
export const TicketSorter = props =>
    <Segment>
        <Dropdown fluid compact selection clearable
            name='sort'
            placeholder='Sort By (default: last modified)'
            content='Sort By'
            value={props.sortCategory}
            options={props.categoryOptions}
            onChange={props.onSortChange} />
    </Segment>

TicketSorter.propTypes = {
    sortCategory: PropTypes.string.isRequired,
    categoryOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    onSortChange: PropTypes.func.isRequired,
}