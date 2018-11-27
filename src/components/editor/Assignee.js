/**
 * @file
 * @summary Creates the Re-Assign Modal Component
 */

import React from 'react';
import { Form, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';

/**
 * @export
 * @function AssigneeForm
 * @summary Creates a dropdown menu in a modal to change the assignee
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.isSearchLoading - whether the search bar is loading results
 * @property {String} props.property - the property to apply to the placeholder
 * @property {String} props.field - the value of the input
 * @property {Boolean} props.error - the error status of the input
 * @property {Array} props.searchResults - the array of search resuls to slect from
 * @property {Function} props.onSearchChange - an event handler to update the search when a change is made
 * @property {Function} props.onSearchSelect - an event handler to update the selected value when a selection is made
 * 
 * @returns {FSC} <AssigneeForm />
 */
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

/**
 * @export
 * @function AssigneeEditor
 * @summary Creates an instance of EditorHandler for assignees
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.original - the current value of the assignee
 * 
 * @returns {React.Component} <EditorHandler />
 */
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