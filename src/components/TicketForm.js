import React from 'react';
import { Form, Search, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dropdownOptions from '../api/DropdownOptions';

export const TicketForm = props =>
    <Form>
        <Form.Input 
            fluid
            label='Summary'
            placeholder='Summary'
            onChange={props.onFieldChange} />
        <Form.TextArea
            autoHeight
            rows='5'
            label='Description'
            placeholder='Description'
            onChange={props.onFieldChange} />
        <Form.Group widths='equal'>
            <Form.Dropdown
                fluid
                selection
                search
                multiple
                allowAdditions
                label='Tags'
                placeholder='Select Multiple or Enter Your Own'
                additionLabel='New Tag: '
                options={dropdownOptions.TagTypes}
                onChange={props.onFieldChange} />
            <Form.Input
                fluid
                readOnly
                label='Attachments'
                placeholder='Files...'
                onChange={props.onFieldChange}
                action={
                    <Button content='Attach Files' color='teal' icon='file image' labelPosition='right' />
                } />
        </Form.Group>
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
    isEditing: true,
}

TicketForm.propTypes = {
    isEditing: PropTypes.bool,
    onFieldChange: PropTypes.func,
}