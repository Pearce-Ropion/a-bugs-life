import React from 'react';
import { Form, Search, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dropdownOptions from '../../api/DropdownOptions';
import TicketProps from '../../api/constants/TicketProps';
import { sortByKey } from '../../api/Utils';

export const TicketForm = props => {
    return <Form style={{ padding: '2em 2em 0'}}>
        <Form.Input 
            fluid
            name='summary'
            label='Summary'
            placeholder='Summary'
            value={props.fields.summary}
            error={props.errors.summary}
            onChange={props.onFieldChange} />
        {
            !props.isEditable &&
                <Form.TextArea
                    autoHeight
                    rows='5'
                    name='description'
                    label='Description'
                    placeholder='Description'
                    value={props.fields.description}
                    error={props.errors.description}
                    onChange={props.onFieldChange} />
        }
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
            error={props.errors.component}
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
                        error={props.errors.comments}
                        onChange={props.onFieldChange} />
                    <Form.Group widths='equal'>
                        <Form.Field fluid
                            control={Search}
                            name='assignee'
                            label='Assignee'
                            placeholder='Assginee'
                            loading={props.assigneeLoading}
                            value={props.fields.assignee}
                            error={props.errors.assignee}
                            onSearchChange={props.onSearchChange}
                            onResultSelect={props.onSearchSelect}
                            results={props.assigneeResults} />
                        <Form.Dropdown
                            fluid
                            disabled
                            selection
                            search
                            multiple
                            allowAdditions
                            name='labels'
                            label='Labels'
                            placeholder='Select or Enter Your Own'
                            additionLabel='New Label: '
                            icon='search'
                            onAddItem={props.onAddItem}
                            value={props.fields.labels}
                            error={props.errors.labels}
                            options={props.labels}
                            onChange={props.onFieldChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            fluid
                            selection
                            name='priority'
                            label='Priority'
                            placeholder='Priority'
                            value={props.fields.priority}
                            error={props.errors.priority}
                            options={dropdownOptions.PriorityLevels}
                            onChange={props.onFieldChange} />
                        <Form.Dropdown
                            fluid
                            selection
                            name='severity'
                            label='Severity'
                            placeholder='Severity'
                            value={props.fields.severity}
                            error={props.errors.severity}
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
                            value={props.fields.status}
                            error={props.errors.status}
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
    errors: PropTypes.objectOf(PropTypes.bool),
    onFieldChange: PropTypes.func,
}