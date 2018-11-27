/**
 * @file
 * @summary Creates the Change Status Modal Component
 */

import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';

import DropdownOptions from '../../api/DropdownOptions';

/**
 * @export
 * @function removeOptions
 * @summary Removes specific options from the types list
 * 
 * @param {Array} types - the available status types
 * 
 * @returns {Array} new types list
 */
export const removeOptions = types => {
    return types.filter(status => {
        return !(status.value === 'Closed' || status.value === 'Resolved');
    });
};

/**
 * @export
 * @function StatusForm
 * @summary Creates a dropdown menu in a modal to change the status type
 * 
 * @param {Object} props - the available props
 * @property {String} props.property - the property to apply to the placeholder
 * @property {String} props.field - the value of the input
 * @property {Function} props.onFieldChange - an event handler to update the dropdown when a change is made
 * 
 * @returns {FSC} <StatusForm />
 */
export const StatusForm = props =>
    <Form>
        <Form.Dropdown fluid compact search selection
            placeholder={props.property}
            options={removeOptions(DropdownOptions.StatusTypes)}
            value={props.field}
            onChange={props.onFieldChange} />
    </Form>;

StatusForm.propTypes = {
    property: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
};

/**
 * @export
 * @function ResolutionEditor
 * @summary Creates an instance of EditorHandler for resolution status
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.original - the current value of the assignee
 * 
 * @returns {React.Component} <EditorHandler />
 */
export const StatusEditor = props =>
    <EditorHandler
        property='Status'
        button='Change Status'
        content={StatusForm}
        original={props.original}
        {...props} />
    
StatusEditor.propTypes = {
    original: PropTypes.string.isRequired,
};