import React from 'react';
import { Segment, Button, Header, Message, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withAxios } from 'react-axios';

import { TicketModal } from './TicketModal';
import { TicketForm } from './TicketForm';

import { ticketFields } from '../api/models/ticket';
import { UserTypes, UserProps } from '../api/constants/Users';
import TicketProps from '../api/constants/TicketProps';
import { sqlNormalizeTicket } from '../api/Utils';

export const TicketHandler = withAxios(class AxiosTicketHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmployee: this.getEmployeeStatus(),
            isModalOpen: false,
            fields: this.getFields(),
            message: {
                header: 'Your Ticket was Successfully Submitted',
                content: 'Please log in to see your reported tickets',
                color: 'green',
                visible: false,
            },
            error: false,
            networkError: false,
        };
    };

    static propTypes = {
        isModal: PropTypes.bool,
        isEditable: PropTypes.bool,
        currentUser: UserProps,
        ticket: PropTypes.shape(TicketProps),
        onSubmitTicket: PropTypes.func,
    }

    UNSAFE_componentWillReceiveProps = nextProps => {
        this.setState({
            fields: this.getFields(),
        });
    };

    getFields = () => {
        if (!this.props.isEditable) {
            if (!(this.props.currentUser === UserTypes.NONE || this.props.currentUser === UserTypes.USER)) {
                return ticketFields({
                    ...this.props.ticket,
                    reporter: this.props.currentUser,
                });
            }
        }
        return ticketFields({
            ...this.props.ticket,
        });
    };

    getEmployeeStatus = () => {
        if (this.props.currentUser === UserTypes.NONE || this.props.currentUser === UserTypes.USER) {
            return false;
        } else {
            return true;
        }
    };

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
            message: {
                header: 'Your Ticket was Successfully Submitted',
                content: 'Please log in to see your reported tickets',
                color: 'green',
                visible: false,
            }
        });
    };

    toggleMessage = () => {
        if (!this.state.error && !this.state.networkError) {
            const self = this;
            setTimeout(() => {
                // self.toggleMessage();
                self.setState({
                    message: {
                        ...self.state.message,
                        visible: false,
                    }
                });
            }, 5000);
        }
    };

    validateForm = () => {
        return true;
    };

    onSubmit = () => {
        this.setState({
            error: false,
            networkError: false,
        });
        if (!this.validateForm()) {
            this.setState({
                message: {
                    ...this.state.message,
                    header: 'There is in error in your bug report',
                    content: 'Please fix the indicated errors to continue',
                    color: 'red',
                    visible: true,
                },
                error: true,
            });
        } else {
            const normalizedFields = sqlNormalizeTicket(this.props.isEditable, this.state.fields)
            // console.log(normalizedFields);
            axios.post(this.props.isEditable ? '/api/update' : '/api/create', normalizedFields)
            .then(response => {
                this.setState({
                    message: {
                        header: 'Your Ticket was Successfully Submitted',
                        content: 'Please log in to see your reported bugs',
                        color: 'green',
                        visible: true,
                    },
                });
                if (this.state.isModalOpen) {
                    this.toggleModal();
                }
                this.toggleMessage();
                if (this.props.hasOwnProperty('onReload')) {
                    this.props.onReload();
                }
            })
            .catch(err => {
                this.setState({
                    message: {
                        header: 'There was an error creating your ticket',
                        content: 'Please reload the page and try again...',
                        color: 'orange',
                        visible: true,
                    },
                    networkError: true,
                });
            });
        }
    };

    render = () => {
        return this.props.isModal
            ? <TicketModal
                isEmployee={this.getEmployeeStatus()}
                isEditable={this.props.isEditable}
                isModalOpen={this.state.isModalOpen}
                fields={this.state.fields}
                onFieldChange={this.onFieldChange}
                toggleModal={this.toggleModal}
                onSubmit={this.onSubmit}
                message={this.state.message}
                labels={this.props.labels} />
            : <React.Fragment>
                <Message header={this.state.message.header} content={this.state.message.content} color={this.state.message.color} hidden={!this.state.message.visible} />
                <Segment>
                    <Header content='Create a Ticket' />
                    <Divider fitted />
                    <TicketForm fields={this.state.fields} onFieldChange={this.onFieldChange} />
                </Segment>
                <Button fluid content='Create' onClick={this.onSubmit} primary />
            </React.Fragment>;
    };
});
