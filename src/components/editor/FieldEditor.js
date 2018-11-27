/**
 * @file
 * @summary Implements the Field Editor Class
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { withAxios } from 'react-axios';

import { ticketFields } from '../../api/models/ticket';
import { sqlNormalizeTicket } from '../../api/Utils';
import Messages from '../../api/constants/Messages';
import TicketProps from '../../api/constants/TicketProps';

/**
 * @export
 * @callback
 * @class FieldEditor
 * @summary Implements editing of single fields with a button
 * 
 * @param {Object} props - the available props
 * @property {String} props.value - the value to change to
 * @property {Object} props.ticket - the current ticket being updated
 * @property {Array} props.field - the current value of the field
 * @property {Function} props.content - the component to render
 * @property {Function} props.onOpenMessage - an event handler to open a specified message
 * @property {Function} props.refreshTickets - an event handler to refresh the list of all tickets
 * @property {Object} props.extraUpdates - other updates to apply to the ticket
 * @property {Object} props.additionalSemProps - additional props to apply to the button
 * 
 * @returns {React.Component} <FieldEditor />
 */
export const FieldEditor = withAxios(class AxiosFieldEditor extends React.Component {
    constructor(props) {
        super(props);
    };

    static defaultProps = {
        additionalSemProps: {},
    };

    static propTypes = {
        value: PropTypes.string,
        ticket: PropTypes.shape(TicketProps).isRequired,
        field: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
        refreshTickets: PropTypes.func.isRequired,
        extraUpdates: PropTypes.object,
        additionalSemProps: PropTypes.object,
    }

    /**
     * @function onUpdate
     * @summary updates the ticket with the new parameters
     */
    onUpdate = () => {
        const ticket = ticketFields({
            ...this.props.ticket,
            [this.props.field]: this.props.value,
            ...this.props.extraUpdates,
        });
        const normalized = sqlNormalizeTicket(true, ticket);

        axios.post('/api/tickets/update', normalized)
            .then(response => {
                this.props.refreshTickets();
                this.props.onOpenMessage(Messages.UPDATE_TICKET_SUCCESS);
            })
            .catch(err => {
                this.props.onOpenMessage(Messages.UPDATE_TICKET_ERROR);
            });
    }

    /**
     * @function render
     * @summary Component rendering
     */
    render = () => {
        return (
            <Button fluid basic {...this.props.additionalSemProps} disabled={this.props.ticket.status === this.props.value} content={this.props.content} field={this.props.field} onClick={this.onUpdate} />
        );
    };
});
