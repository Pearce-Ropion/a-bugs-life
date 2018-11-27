/**
 * @file
 * @summary Creates the Button to toggle the simple editor modal Component
 */

import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * @export
 * @function ToggleEditor
 * @summary A button to toggle the simple editor modal
 * 
 * @param {Object} props - the available props
 * @property {String} props.title - the name of the button
 * @property {Function} props.toggleEditorModal - an event handler to toggle the modal on and off
 * 
 * @returns {FSC} <ToggleEditor />
 */
export const ToggleEditor = props =>
    <Button basic fluid content={props.title} onClick={props.toggleEditorModal} />;

ToggleEditor.propTypes = {
    title: PropTypes.string,
    toggleEditorModal: PropTypes.func,
};
