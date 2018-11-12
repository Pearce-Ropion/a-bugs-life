import React from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dropdownOptions from '../api/DropdownOptions';
import TicketProps from '../api/constants/TicketProps';
import { UserDropdownOptions } from '../api/constants/Users';
import { sortByKey } from '../api/Utils';

export const TicketForm = props => {
    return <Form style={{ padding: '2em 2em 0'}}>
        <Form.Input 
            fluid
            name='summary'
            label='Summary'
            placeholder='Summary'
            value={props.fields.summary}
            onChange={props.onFieldChange} />
        <Form.TextArea
            autoHeight
            rows='5'
            name='description'
            label='Description'
            placeholder='Description'
            value={props.fields.description}
            onChange={props.onFieldChange} />
        <Form.Dropdown
            fluid
            selection
            search
            allowAdditions
            name='component'
            label='Component'
            placeholder='Select Multiple or Enter Your Own'
            additionLabel='New Component: '
            value={props.fields.component}
            options={sortByKey(dropdownOptions.ComponentTypes, 'value')}
            onChange={props.onFieldChange} />
        {
            props.isEmployee &&
                <React.Fragment>
                    <Divider />
                    <Form.TextArea
                        autoHeight
                        rows='5'
                        name='comments'
                        label='Comments'
                        placeholder='Comments'
                        value={props.fields.comments}
                        onChange={props.onFieldChange} />
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            fluid
                            selection
                            search
                            name='assignee'
                            label='Assignee'
                            placeholder='Assginee'
                            icon='search'
                            value={props.fields.assignee.name}
                            options={UserDropdownOptions}
                            onChange={props.onFieldChange} />
                        <Form.Dropdown
                            fluid
                            selection
                            search
                            multiple
                            allowAdditions
                            name='labels'
                            label='Labels'
                            placeholder='Select or Enter Your Own'
                            additionLabel='New Label: '
                            icon='search'
                            value={props.fields.labels}
                            options={props.labels.labelDropdownOptions}
                            onChange={props.onFieldChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            fluid
                            selection
                            name='priority'
                            label='Priority'
                            placeholder='Priority'
                            value={props.fields.priority.name}
                            options={dropdownOptions.PriorityLevels}
                            onChange={props.onFieldChange} />
                        <Form.Dropdown
                            fluid
                            selection
                            name='severity'
                            label='Severity'
                            placeholder='Severity'
                            value={props.fields.severity}
                            options={dropdownOptions.SeverityLevels}
                            onChange={props.onFieldChange} />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Dropdown
                            fluid
                            selection
                            name='status'
                            label='Status'
                            placeholder='Status'
                            value={props.fields.status.name}
                            options={dropdownOptions.StatusTypes}
                            onChange={props.onFieldChange} />
                    </Form.Group>
                </React.Fragment>
        }
    </Form>
}

TicketForm.defaultProps = {
    isEditable: false,
    isEmployee: false,
}

TicketForm.propTypes = {
    isEditable: PropTypes.bool,
    isEmployee: PropTypes.bool,
    fields: PropTypes.shape(TicketProps),
    onFieldChange: PropTypes.func,
}