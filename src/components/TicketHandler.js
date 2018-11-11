import React from 'react';
import { Segment, Button, Header, Message, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withAxios } from 'react-axios';
import memoize from 'memoize-one';
import _ from 'lodash';

import { TicketModal } from './TicketModal';
import { TicketForm } from './TicketForm';

import { ticketFields } from '../api/models/ticket';
import { UserTypes, UserProps } from '../api/constants/Users';
import TicketProps from '../api/constants/TicketProps';
import { sqlNormalizeTicket } from '../api/Utils';
import Messages from '../api/constants/Messages';

export const TicketHandler = withAxios(class AxiosTicketHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            fields: this.getTicket(this.props.ticket),
        };
    };

    static propTypes = {
        isModal: PropTypes.bool,
        isEditable: PropTypes.bool,
        currentUser: UserProps,
        ticket: PropTypes.shape(TicketProps),
        onSubmitTicket: PropTypes.func,
        refreshTickets: PropTypes.func.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.ticket !== prevProps.ticket) {
            this.setState({
                fields: this.getTicket(this.props.ticket)
            });
        }
    };

    getTicket = ticket => {
        const { isEditable, currentUser } = this.props;
        if (!isEditable) {
            if (!(currentUser === UserTypes.NONE || currentUser === UserTypes.USER)) {
                return ticketFields({
                    ...ticket,
                    reporter: currentUser,
                });
            }
        }
        return ticketFields({
            ...ticket,
        });
    };

    getFields = (ticket, fields) => ({
        ...ticket,
        ...fields,
    });

    onFieldChange = (event, data) => {
        this.setState({
            fields: ticketFields({
                ...this.state.fields,
                [data.name]: data.value,
            }),
        });
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

    validateForm = () => {
        return true;
    };

    onSubmit = () => {
        if (!this.validateForm()) {
            this.props.onOpenMessage(Messages.TICKET_FIELD_ERROR);
        } else {
            const normalizedFields = sqlNormalizeTicket(this.props.isEditable, this.state.fields)
            axios.post(this.props.isEditable ? '/api/tickets/update' : '/api/tickets/create', normalizedFields)
            .then(response => {
                this.setState({
                    fields: this.props.isEditable ? this.getTicket(this.props.ticket) : ticketFields({}),
                });
                if (this.state.isModalOpen) {
                    this.toggleModal();
                }
                this.props.refreshTickets();
                this.props.onOpenMessage(this.props.isEditable ? Messages.UPDATE_TICKET_SUCCESS : Messages.CREATE_TICKET_SUCCESS);
            })
            .catch(err => {
                this.props.onOpenMessage(this.props.isEditable ? Messages.UPDATE_TICKET_ERROR : Messages.CREATE_TICKET_ERROR);
            });
        }
    };

    render = () => {
        // console.log('field', this.state.fields)
        // console.log('ticket', this.props.ticket);
        // const ticketFields = this.getTicket(this.props.ticket);
        return this.props.isModal
            ? <TicketModal
                isEmployee={!(this.props.currentUser === UserTypes.NONE || this.props.currentUser === UserTypes.USER)}
                isEditable={this.props.isEditable}
                isModalOpen={this.state.isModalOpen}
                fields={this.state.fields}
                onFieldChange={this.onFieldChange}
                toggleModal={this.toggleModal}
                onSubmit={this.onSubmit}
                labels={this.props.labels} />
            : <React.Fragment>
                <Segment>
                    <Header content='Create a Ticket' />
                    <Divider fitted />
                    <TicketForm fields={this.state.fields} onFieldChange={this.onFieldChange} />
                </Segment>
                <Button fluid content='Create' onClick={this.onSubmit} primary />
            </React.Fragment>;
    };
});
