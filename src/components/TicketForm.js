import React from 'react';
import { Form, Search, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dropdownOptions from '../api/DropdownOptions';

export const TicketForm = props =>
    <Form>
        <Form.Group widths='equal'>
            <Form.Dropdown 
                fluid
                selection
                label='Ticket Type'
                placeholder='Type'
                options={dropdownOptions.TicketTypes}
                onChange={props.onFieldChange} />
            <Form.Dropdown
                fluid
                selection
                search
                multiple
                allowAdditions
                label='Tags'
                placeholder='Tags'
                additionLabel='New Tag: '
                onChange={props.onFieldChange} />
        </Form.Group>
        <Form.Input 
            fluid
            label='Summary'
            placeholder='Summary'
            onChange={props.onFieldChange} />
        <Form.TextArea
            fluid
            autoHeight
            rows='5'
            label='Description'
            placeholder='Description'
            onChange={props.onFieldChange} />
        {
            props.isEditing &&
                <React.Fragment>
                    <Divider />
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            control={Search}
                            label='Assignee'
                            placeholder='Assginee'
                            onChange={props.onFieldChange} />
                        <Form.Dropdown
                            fluid
                            selection
                            search
                            multiple
                            label='Watchers'
                            placeholder='Watchers'
                            icon='search'
                            onChange={props.onFieldChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            fluid
                            selection
                            label='Priority'
                            placeholder='Priority'
                            options={dropdownOptions.PriorityLevels} />
                        <Form.Dropdown
                            fluid
                            selection
                            label='Severity'
                            placeholder='Severity'
                            options={dropdownOptions.SeverityLevels} />
                    </Form.Group>
                </React.Fragment>
        }
    </Form>

TicketForm.defaultProps = {
    isEditing: false,
}

TicketForm.propTypes = {
    isEditing: PropTypes.bool,
    onFieldChange: PropTypes.func,
}