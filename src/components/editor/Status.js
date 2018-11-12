import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EditorHandler } from './EditorHandler';
import DropdownOptions from '../../api/DropdownOptions';

export const removeOptions = types => {
    return types.filter(status => {
        return !(status.value === 'Closed' || status.value === 'Resolved');
    });
};


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