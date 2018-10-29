import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { EditorModal } from './EditorModal';
import { UserDropdownOptions } from '../api/constants/Users';

export const AssigneeButton = props =>
    <Button basic fluid content='Assign' onClick={props.toggleEditorModal} />;

AssigneeButton.propTypes = {
    toggleEditorModal: PropTypes.func,
};

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
            value={props.fields.assignee.name}
            options={UserDropdownOptions}
            onChange={props.onFieldChange} />
    </Form>;

AssigneeContent.propTypes = {
    fields: PropTypes.shape({
        assignee: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    onFieldChange: PropTypes.func,
};

export const AssigneeEditor = props =>
    <EditorModal
        isOpen={props.isEditorModalOpen}
        property='Assignee'
        fields={props.fields}
        trigger={AssigneeButton}
        content={AssigneeContent}
        toggle={props.toggleEditorModal}
        onUpdate={props.onUpdate} />
    
AssigneeEditor.propTypes = {
    isEditorModalOpen: PropTypes.bool,
    fields: PropTypes.shape({
        assignee: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    toggleEditorModal: PropTypes.func,
    onUpdate: PropTypes.func,
};