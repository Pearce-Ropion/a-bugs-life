import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';
import DropdownOptions from '../../api/DropdownOptions';


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