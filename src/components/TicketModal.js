import React from 'react';
import { Modal, Button, Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketForm } from './TicketForm';
import TicketProps from '../api/constants/TicketProps';

export const TicketModal = props =>
    <Modal
        open={props.isModalOpen}
        className='create'
        header='Create a Ticket'
        trigger={
            props.isEditable
                ? <Button basic fluid content='Edit' onClick={props.toggleModal} className='action' />
                : <Button basic inverted content='Create' onClick={props.toggleModal} className='create' />
        }
        content={
            <React.Fragment>
                <Message style={{ margin: '2em 2em 0' }} header={props.message.header} content={props.message.content} color={props.message.color} hidden={!props.message.visible} />
                <TicketForm isEditable={props.isEditable} isEmployee={props.isEmployee} fields={props.fields} labels={props.labels} onFieldChange={props.onFieldChange} />
            </React.Fragment>
        }
        actions={[
            <Button key='cancel-ticket-modal' content='Cancel' onClick={props.toggleModal} />,
            <Button key='update-ticket-modal' content={props.isEditable ? 'Update' : 'Create'} onClick={props.onSubmit} primary />
        ]} />

TicketModal.defaultProps = {
    isEditable: false,
    isModalOpen: false,
    isEmployee: false,
};

TicketModal.propTypes = {
    isEditable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    isEmployee: PropTypes.bool,
    message: PropTypes.shape({
        header: PropTypes.string,
        content: PropTypes.string,
        color: PropTypes.string,
        visible: PropTypes.bool,
    }),
    fields: PropTypes.shape(TicketProps),
    onFieldChange: PropTypes.func,
    toggleModal: PropTypes.func,
    onSubmit: PropTypes.func,
};
