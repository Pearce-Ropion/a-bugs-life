import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Dropdown } from 'semantic-ui-react';

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