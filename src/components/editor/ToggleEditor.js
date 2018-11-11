import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const ToggleEditor = props =>
    <Button basic fluid content={props.title} onClick={props.toggleEditorModal} />;

ToggleEditor.propTypes = {
    title: PropTypes.string,
    toggleEditorModal: PropTypes.func,
};
