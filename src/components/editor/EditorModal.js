import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const EditorModal = props =>
    <Modal
        size='mini'
        className='editor'
        open={props.isOpen}
        header={`Edit ${props.property}`}
        trigger={props.trigger}
        content={props.content}
        actions={[
            <Button key='cancel-editor-modal' content='Cancel' onClick={props.toggle} />,
            <Button key='update-editor-modal' content='Update' onClick={props.onUpdate} positive />,
        ]} />;

EditorModal.defaultProps = {
    isOpen: false,
}

EditorModal.propTypes = {
    isOpen: PropTypes.bool,
    property: PropTypes.string,
    trigger: PropTypes.node,
    content: PropTypes.node,
    toggle: PropTypes.func,
    onUpdate: PropTypes.func,
};