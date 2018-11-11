import React from 'react';
import { Form, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';


export const AssigneeForm = props =>
    <Form>
        <Search fluid compact
            loading={props.isSearchLoading}
            onResultSelect={props.onResultSelect}
            onSearchChange={props.onSearchChange}
            results={props.users}
            value={props.field} />
    </Form>;

AssigneeForm.propTypes = {
    fields: PropTypes.shape({
        assignee: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    onFieldChange: PropTypes.func,
};

export const AssigneeEditor = props =>
    <EditorHandler
        property='Assignee'
        values={props.fields}
        content={AssigneeForm}
        {...props} />
    
AssigneeEditor.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    toggleEditorModal: PropTypes.func,
    onUpdate: PropTypes.func,
    // ticket, onOpenMessage, users
};