import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketForm } from './TicketForm';
import { TicketTypes, PriorityLevels, SeverityLevels } from '../api/constants/Ticket';
import TicketProps from '../api/constants/TicketProps';

export const TicketModal = props =>
    <Modal
        className='create'
        header='Create a Ticket'
        trigger={ props.isOnMenu
            ? <Button basic inverted content='Create' onClick={props.onToggleTicketModal} className='create' />
            : <Button content='Edit' onClick={props.onToggleTicketModal} className='action' />
        }
        content={ <TicketForm ticket={props.ticketForm} /> }
        actions={[
            <Button key='cancel-ticket-modal' content='Cancel' onClick={props.onCancelTicketModal} />,
            <Button key='update-ticket-modal' content={props.isOnMenu ? 'Create' : 'Update'} onClick={props.onUpdateTicketModal} primary />
        ]} />

TicketModal.defaultProps = {
    isEditing: false,
    isOnMenu: false,
};

TicketModal.propTypes = {
    isEditing: PropTypes.bool,
    ticketForm: PropTypes.shape(TicketProps),
    onOpenTicketModal: PropTypes.func,
    onCancelTicketModal: PropTypes.func,
    onUpdateTicketModal: PropTypes.func
}