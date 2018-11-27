/**
 * @file
 * @summary Implements the Ticket Handler Class
 */

import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketForm } from './TicketForm';
import TicketProps from '../../api/constants/TicketProps';
import { LabelProps } from '../../api/Labels';

/**
 * @export
 * @function TicketModal
 * @summary Implements the ticket modal
 * 
 * @param {Object} props - the available props
 * @property {Boolean} isEditable - whether the ticket is getting updated
 * @property {Boolean} isModalOpen - whether the modal is visible
 * @property {Boolean} isEmployee - whether the current user is an employee
 * @property {Boolean} fields - the fields to pass to the handler
 * @property {Boolean} errors - the error state of the fields
 * @property {Boolean} labels - all the labels
 * @property {Boolean} assigneeLoading - the loading state of the assignee search field
 * @property {Boolean} assigneeResults - the results of the assignee search
 * @property {Boolean} onSearchChange - an event handler to update the search resuls
 * @property {Boolean} onFieldChange - an event handler to update the field value
 * @property {Boolean} toggleModal - an event handler to toggle the modal
 * @property {Boolean} onAddItem - an event handler to add a label type
 * @property {Boolean} onSubmit - an event handler to submit a ticket
 * 
 * @returns {FSC} <TicketModal />
 */
export const TicketModal = props =>
    <Modal
        open={props.isModalOpen}
        className='create'
        header={props.isEditable ? 'Update Ticket' : 'Create a Ticket'}
        trigger={
            props.isEditable
                ? <Button basic fluid content='Edit' onClick={props.toggleModal} className='action' />
                : <Button basic inverted content='Create' onClick={props.toggleModal} className='create' />
        }
        content={
            <TicketForm
                fields={props.fields}
                errors={props.errors}
                labels={props.labels}
                isEditable={props.isEditable}
                isEmployee={props.isEmployee}
                assigneeLoading={props.assigneeLoading}
                assigneeResults={props.assigneeResults}
                onSearchChange={props.onSearchChange}
                onSearchSelect={props.onSearchSelect}
                onAddItem={props.onAddItem}
                onFieldChange={props.onFieldChange} />
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
    assigneeLoading: PropTypes.bool,
    assigneeResults: PropTypes.object,
    onSearchChange: PropTypes.func,
    onSearchSelect: PropTypes.func,
    onAddItem: PropTypes.func,
    fields: PropTypes.shape(TicketProps),
    errors: PropTypes.objectOf(PropTypes.bool),
    labels: LabelProps,
    onFieldChange: PropTypes.func,
    toggleModal: PropTypes.func,
    onSubmit: PropTypes.func,
};
