/**
 * @file
 * @summary Implements the New User Handler Class
 */

import React from 'react'
import { Button, Modal, Label, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import validator from 'email-validator';
import axios from 'axios';
import { withAxios } from 'react-axios';
import bcrypt from 'bcryptjs';

import { NewUserForm } from './NewUserForm';
import { userFields, userFieldsError } from '../../api/models/user';
import { sqlNormalizeUser } from '../../api/Utils';
import Messages from '../../api/constants/Messages';

/**
 * @export
 * @callback
 * @class NewUserHandler
 * @summary Implements logging into the application
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.isUserModalOpen - whether the modal is open
 * @property {Function} props.toggleUserModal - an event handler to toggle the visibility of the modal
 * @property {Function} props.onOpenMessage - an event handler to open a specified message
 * @property {Function} props.refreshUsers - an event handler to refresh the user list
 * @property {Function} props.onCreateUser - an event handler to toggle a create user action
 * 
 * @returns {React.Component} <NewUserHandler />
 */
export const NewUserHandler = withAxios(class AxiosNewUserHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: userFields({}),
            error: userFieldsError({}),
            confirmation: {
                field: '',
                error: false,
            },
        };
    };

    static defaultProps = {
        isUserModalOpen: false,
    }

    static propTypes = {
        isUserModalOpen: PropTypes.bool,
        toggleUserModal: PropTypes.func.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
        refreshUsers: PropTypes.func.isRequired,
        onCreateUser: PropTypes.func.isRequired,
    }

    /**
     * @function onFieldChange
     * @summary Updates the value of the field
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new value
     */
    onFieldChange = (event, data) => {
        if (data.name !== 'confirmation') {
            this.setState({
                error: userFieldsError({
                    ...this.state.error,
                    [data.name]: false,
                }),
                fields: userFields({
                    ...this.state.fields,
                    [data.name]: data.value,
                    role: this.state.fields.role.name
                }),
            });
        } else {
            this.setState({
                confirmation: {
                    ...this.state.confirmation,
                    field: data.value,
                },
            });
        }
    };

    /**
     * @function toggleUserModal
     * @summary Opens and closes the user creation modal
     */
    toggleUserModal = () => {
        this.setState({
            fields: userFields({}),
            error: userFieldsError({}),
            confirmation: {
                field: '',
                error: false,
            },
        });
        this.props.toggleUserModal();
    }

    /**
     * @function validateUser
     * @summary validates the entries in the fields
     */
    validateUser = () => {
        const newError = userFieldsError({});
        let confirmationError = false;
        Object.entries(this.state.fields).forEach(([key, field]) => {
            if (key !== 'id' || key !== 'role') {
                if (field === '') {
                    newError[key] = true;
                }
                if (key === 'email') {
                    newError.email = !validator.validate(field);
                }
                if (key === 'password') {
                    if (field.length < 6) {
                        newError.password = true;
                    }
                    if (this.state.confirmation.field != field) {
                        newError.password = true;
                        confirmationError = true;
                    }
                }
            }
        });
        if (this.state.confirmation.field === '') {
            confirmationError = true;
        }
        this.setState({
            error: newError,
            confirmation: {
                ...this.state.confirmation,
                error: confirmationError,
            }
        });
        return !Object.values(newError).concat([confirmationError]).includes(true);
    }

    /** 
     * @function onCreateUser
     * @summary Creates a new user and hashes their password 
     */
    onCreateUser = () => {
        if (this.validateUser()) {
            const hash = bcrypt.hashSync(this.state.fields.password, 8);
            const normalizedFields = sqlNormalizeUser(false, {
                ...this.state.fields,
                password: hash,
            });
            axios.post('/api/users/create', normalizedFields)
                .then(response => {
                    this.toggleUserModal();
                    this.props.onCreateUser(true);
                    this.props.onOpenMessage(Messages.CREATE_USER_SUCCESS);
                    this.props.refreshUsers();
                })
                .catch(err => console.warn(err));
        }
    };

    /**
     * @function render
     * @summary Renders the component
     */
    render = () => {
        return <Modal
            size='small'
            className='login'
            open={this.props.isUserModalOpen}
            header='Create User'
            trigger={
                <Segment basic textAlign='right'
                    style={{ paddingTop: '0', marginTop: '0', paddingRight: '2em'}}>
                    <Label basic color='teal' as='a' content='Create New User' onClick={this.props.toggleUserModal} />
                </Segment>
            }
            content={
                <NewUserForm fields={this.state.fields} error={this.state.error} confirmation={this.state.confirmation} onFieldChange={this.onFieldChange} />
            }
            actions={[
                <Button key='cancel-user-modal' content='Cancel' onClick={this.props.toggleUserModal} />,
                <Button key='create-user-modal' content='Create' onClick={this.onCreateUser} positive />,
            ]} />;
    };
});
