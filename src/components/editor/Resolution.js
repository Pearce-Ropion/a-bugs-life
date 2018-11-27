/**
 * @file
 * @summary Creates the Close Ticket Modal Component
 */

import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';

import DropdownOptions from '../../api/DropdownOptions';

/**
 * @export
 * @function ResolutionForm
 * @summary Creates a dropdown menu in a modal to change the resolution type
 * 
 * @param {Object} props - the available props
 * @property {String} props.property - the property to apply to the placeholder
 * @property {String} props.field - the value of the input
 * @property {Function} props.onFieldChange - an event handler to update the dropdown when a change is made
 * 
 * @returns {FSC} <ResolutionForm />
 */
export const ResolutionForm = props =>
    <Form>
        <Form.Dropdown fluid compact search selection
            placeholder={props.property}
            options={DropdownOptions.ResolutionTypes}
            value={props.field}
            onChange={props.onFieldChange} />
    </Form>;

ResolutionForm.propTypes = {
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
export const ResolutionEditor = props =>
    <EditorHandler
        property='Resolution'
        button='Close Ticket'
        content={ResolutionForm}
        original={props.original}
        {...props} />

ResolutionEditor.propTypes = {
    original: PropTypes.string.isRequired,
};