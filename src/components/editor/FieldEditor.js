import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { withAxios } from 'react-axios';

import { ticketFields } from '../../api/models/ticket';
import { sqlNormalizeTicket } from '../../api/Utils';
import Messages from '../../api/constants/Messages';
import TicketProps from '../../api/constants/TicketProps';

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

    render = () => {
        return (
            <Button fluid basic {...this.props.additionalSemProps} disabled={this.props.ticket.status === this.props.value} content={this.props.content} field={this.props.field} onClick={this.onUpdate} />
        );
    };
});
