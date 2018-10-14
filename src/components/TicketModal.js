import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketForm } from './TicketForm';
import { TicketTypes, PriorityLevels, SeverityLevels } from '../api/constants/Ticket';

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
            <Button key='cancel-ticket-modal'  content='Cancel' onClick={props.onCancelTicketModal} secondary />,
            <Button key='update-ticket-modal' content={props.isOnMenu ? 'Create' : 'Update'} onClick={props.onUpdateTicketModal} positive />
        ]} />

TicketModal.defaultProps = {
    isEditing: false,
    isOnMenu: false,
};

TicketModal.propTypes = {
    isEditing: PropTypes.bool,
    ticketForm: PropTypes.shape({
        project: PropTypes.string,
        type: PropTypes.oneOf(Object.keys(TicketTypes)),
        summary: PropTypes.string,
        description: PropTypes.string,
        assignee: PropTypes.string,
        reporter: PropTypes.string,
        watchers: PropTypes.arrayOf(PropTypes.string),
        components: PropTypes.string,
        epic: PropTypes.id,
        priority: PropTypes.oneOf(Object.keys(PriorityLevels)),
        severity: PropTypes.oneOf(Object.keys(SeverityLevels)),
        labels: PropTypes.arrayOf(PropTypes.string),
        attachments: PropTypes.arrayOf(PropTypes.number),
        status: PropTypes.shape({
            type: PropTypes.symbol,
            value: PropTypes.string,
            color: PropTypes.string,
        }),
        dateCreated: PropTypes.number,
        dateModified: PropTypes.number,
        dateClosed: PropTypes.number,
    }),
    onOpenTicketModal: PropTypes.func,
    onCancelTicketModal: PropTypes.func,
    onUpdateTicketModal: PropTypes.func
}