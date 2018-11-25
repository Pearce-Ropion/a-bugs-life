import React from 'react';
import { Segment, Button, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withAxios } from 'react-axios';
import memoize from 'memoize-one';
import _ from 'lodash';

import { TicketModal } from './TicketModal';
import { TicketForm } from './TicketForm';

import { ticketFields, ticketFieldErrors } from '../api/models/ticket';
import { UserTypes, CurrentUserProps } from '../api/constants/Users';
import TicketProps from '../api/constants/TicketProps';
import { sqlNormalizeTicket } from '../api/Utils';
import Messages from '../api/constants/Messages';
import { LabelProps } from '../api/Labels';

export const TicketHandler = withAxios(class AxiosTicketHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            fields: this.getTicket(this.props.ticket),
            errors: ticketFieldErrors({}),
            isAssigneeLoading: false,
            assigneeResults: [],
            labels: this.props.labels.labelDropdownOptions,
        };
    };

    static propTypes = {
        isModal: PropTypes.bool,
        isEditable: PropTypes.bool,
        currentUser: PropTypes.shape(CurrentUserProps),
        ticket: PropTypes.shape(TicketProps),
        labels: LabelProps,
        onSubmitTicket: PropTypes.func,
        refreshTickets: PropTypes.func.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
    };

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
            if (!(currentUser.role === UserTypes.NONE || currentUser.role === UserTypes.USER)) {
                return ticketFields({
                    ...ticket,
                    reporter: currentUser.name,
                });
            }
        }
        return ticketFields({
            ...ticket,
        });
    };

    onFieldChange = (event, data) => {
        this.setState({
            fields: ticketFields({
                ...this.state.fields,
                [data.name]: data.value,
            }),
        });
    };

    onSearchChange = (event, data) => {
        this.setState({
            isAssigneeLoading: true,
            fields: ticketFields({
                ...this.state.fields,
                assignee: data.value,
            }),
        });

        setTimeout(() => {
            if (this.state.fields.assignee.length < 1) {
                this.setState({
                    isAssigneeLoading: false,
                });
            } else {
                const re = new RegExp(_.escapeRegExp(data.value), 'i');
                const isMatch = result => re.test(result.title);

                this.setState({
                    isAssigneeLoading: false,
                    assigneeResults: _.filter(this.props.users.map(user => {
                        return {
                            title: user.name,
                            role: user.role,
                        };
                    }), isMatch),
                });
            }
        }, 300);
    };

    onSearchSelect = (event, data) => {
        this.onFieldChange(event, {
            name: data.name,
            value: data.result.title
        });
    };

    onAddItem = (event, data) => {
        this.setState({
            labels: [
                ...this.state.labels,
                {
                    key: data.value,
                    value: data.value,
                    text: data.value,
                },
            ],
        });
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

    validateForm = () => {
        const newError = ticketFieldErrors({});
        Object.entries(this.state.fields).forEach(([key, field]) => {
            if (key === 'summary' || key === 'description' || key === 'component') {
                if (!field.length) {
                    newError[key] = true;
                    console.log('error detected at: ', key);
                }
            }
            if (this.props.currentUser.role !== UserTypes.NONE) {
                if (key === 'assignee' && !field.length) {
                    newError[key] = true;
                    console.log('error detected at: ', key);
                }
            }
        });
        this.setState({
            error: newError,
        });
        return !Object.values(newError).includes(true);
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
        return this.props.isModal
            ? <TicketModal
                isEmployee={!(this.props.currentUser.role === UserTypes.NONE || this.props.currentUser.role === UserTypes.USER)}
                isEditable={this.props.isEditable}
                isModalOpen={this.state.isModalOpen}
                fields={this.state.fields}
                errors={this.state.errors}
                onFieldChange={this.onFieldChange}
                toggleModal={this.toggleModal}
                onSubmit={this.onSubmit}
                assigneeLoading={this.state.isAssigneeLoading}
                assigneeResults={this.state.assigneeResults}
                onSearchChange={this.onSearchChange}
                onSearchSelect={this.onSearchSelect}
                onAddItem={this.onAddItem}
                labels={this.state.labels} />
            : <React.Fragment>
                <Segment>
                    <Header content='Create a Ticket' />
                    <Divider fitted />
                    <TicketForm
                        fields={this.state.fields}
                        errors={this.state.errors}
                        onFieldChange={this.onFieldChange} />
                </Segment>
                <Button fluid content='Create' onClick={this.onSubmit} primary />
            </React.Fragment>;
    };
});
