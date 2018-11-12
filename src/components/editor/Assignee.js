import React from 'react';
import { Form, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';


export const AssigneeForm = props =>
    <Form>
        <Form.Field fluid
            control={Search}
            placeholder={props.property}
            loading={props.isSearchLoading}
            onResultSelect={props.onSearchSelect}
            onSearchChange={props.onSearchChange}
            results={props.searchResults}
            value={props.field}
            error={props.error} />
    </Form>;

AssigneeForm.propTypes = {
    isSearchLoading: PropTypes.bool,
    property: PropTypes.string,
    field: PropTypes.string,
    error: PropTypes.bool,
    searchResults: PropTypes.arrayOf({
        title: PropTypes.string,
        role: PropTypes.string,
    }),
    onSearchChange: PropTypes.func.isRequired,
    onSearchSelect: PropTypes.func.isRequired,
};

export const AssigneeEditor = props =>
    <EditorHandler
        property='Assignee'
        button='Re-Assign'
        content={AssigneeForm}
        original={props.original}
        {...props} />
    
AssigneeEditor.propTypes = {
    original: PropTypes.string.isRequired,
};