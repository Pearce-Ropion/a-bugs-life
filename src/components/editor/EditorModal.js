import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const EditorModal = props =>
    <Modal
        size='mini'
        className='editor'
        open={props.isEditorModalOpen}
        header={`Edit ${props.property}`}
        trigger={props.trigger}
        content={props.content}
        actions={[
            <Button key='cancel-editor-modal' content='Cancel' onClick={props.toggleEditorModal} />,
            <Button key='update-editor-modal' content='Update' onClick={props.onUpdate} positive />,
        ]} />;

EditorModal.defaultProps = {
    isEditorModalOpen: false,
}

EditorModal.propTypes = {
    isEditorModalOpen: PropTypes.bool,
    property: PropTypes.string,
    trigger: PropTypes.node,
    content: PropTypes.node,
    toggleEditorModal: PropTypes.func,
    onUpdate: PropTypes.func,
};