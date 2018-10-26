import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserDropdownOptions } from '../api/constants/Users';

export const AssigneeButton = props =>
    <Button basic fluid content='Assign' onClick={props.toggleEditorModal} />

AssigneeButton.propTypes = {
    toggleEditorModal: PropTypes.func,
}

export const AssigneeContent = props =>
    <Form>
        <Form.Dropdown
            fluid
            selection
            search
            multiple
            label='Assignee'
            placeholder='Assignee'
            icon='Search'
            options={UserDropdownOptions}
            onChange={props.onFieldChange}
            value={props.value} />
    </Form>
    
AssigneeContent.propTypes = {
    value: PropTypes.string,
    onFieldChange: PropTypes.func,
}