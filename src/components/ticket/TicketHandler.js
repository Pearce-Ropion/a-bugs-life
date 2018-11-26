import React from 'react';
import { Segment, Button, Header, Divider, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withAxios } from 'react-axios';
import _ from 'lodash';

import { TicketModal } from './TicketModal';
import { TicketForm } from './TicketForm';

import { ticketFields, ticketFieldErrors } from '../../api/models/ticket';
import { UserTypes, CurrentUserProps } from '../../api/constants/Users';
import TicketProps from '../../api/constants/TicketProps';
import { sqlNormalizeTicket } from '../../api/Utils';
import Messages from '../../api/constants/Messages';
import { LabelProps } from '../../api/Labels';

const userFieldFactory = ({ fname = '', lname = '' }) => ({ fname, lname });
const userErrorFactory = ({ fname = false, lname = false }) => ({ fname, lname });

export const TicketHandler = withAxios(class AxiosTicketHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            fields: this.getTicket(this.props.ticket),
            userFields: userFieldFactory({}),
            errors: ticketFieldErrors({}),
            userErrors: userErrorFactory({}),
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
            errors: ticketFieldErrors({
                ...this.state.errors,
                [data.name]: false,
            }),
        });
    };

    onUserFieldChange = (event, data) => {
        this.setState({
            userFields: userFieldFactory({
                ...this.state.userFields,
                [data.name]: data.value,
            }),
            userErrors: userErrorFactory({
                ...this.state.userErrors,
                [data.name]: false,
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
        const newUserError = userErrorFactory({});
        Object.entries(this.state.fields).forEach(([key, field]) => {
            if (key === 'summary' || key === 'description' || key === 'component') {
                if (!field.length) {
                    newError[key] = true;
                    // console.log('error detected at: ', key);
                }
            }
            if (this.props.currentUser.role !== UserTypes.NONE) {
                if (key === 'assignee' && !field.length) {
                    newError[key] = true;
                    // console.log('error detected at: ', key);
                }
            }
        });
        this.setState({
            error: newError,
        });
        const valid = !Object.values(newError).includes(true);

        if (this.props.currentUser.role === UserTypes.NONE) {
            Object.entries(this.state.userFields).forEach(([key, field]) => {
                if (!field.length) {
                    newUserError[key] = true;
                }
            });
            this.setState({
                userErrors: newUserError,
            });
            const userValid = !Object.values(newUserError).includes(true);
            return valid && userValid;
        }
        return valid;
    };

    onSubmit = () => {
        if (!this.validateForm()) {
            this.props.onOpenMessage(Messages.TICKET_FIELD_ERROR);
        } else {
            let { fields } = this.state;
            if (this.props.currentUser.role === UserTypes.NONE) {
                fields.reporter = this.state.userFields.fname.concat(' ', this.state.userFields.lname);
            }

            const normalizedFields = sqlNormalizeTicket(this.props.isEditable, fields)
            axios.post(this.props.isEditable ? '/api/tickets/update' : '/api/tickets/create', normalizedFields)
            .then(response => {
                this.setState({
                    fields: this.props.isEditable ? this.getTicket(this.props.ticket) : ticketFields({}),
                    userFields: userFieldFactory({}),
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
                <Segment.Group>
                    <Segment>
                        <Header content='Create a Ticket' />
                        <Divider fitted />
                        <TicketForm
                            fields={this.state.fields}
                            errors={this.state.errors}
                            onFieldChange={this.onFieldChange} />
                    </Segment>
                    <Segment>
                        <Form style={{ padding: '0 2em 0' }}>
                            <Form.Group widths='equal'>
                                <Form.Input fluid
                                    name='fname'
                                    label='First Name'
                                    placeholder='First Name'
                                    value={this.state.userFields.fname}
                                    error={this.state.userErrors.fname}
                                    onChange={this.onUserFieldChange} />
                                <Form.Input fluid
                                    name='lname'
                                    label='Last Name'
                                    placeholder='Last Name'
                                    value={this.state.userFields.lname}
                                    error={this.state.userErrors.lname}
                                    onChange={this.onUserFieldChange} />
                            </Form.Group>
                        </Form>
                    </Segment>
                </Segment.Group>
                <Button fluid content='Create' onClick={this.onSubmit} primary />
            </React.Fragment>;
    };
});
