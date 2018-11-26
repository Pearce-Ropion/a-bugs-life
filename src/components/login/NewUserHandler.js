import React from 'react'
import { Button, Modal, Label, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import validator from 'email-validator';
import axios from 'axios';
import { withAxios } from 'react-axios';
// import bcrypt from 'bcrypt';

import { NewUserForm } from './NewUserForm';
import { userFields, userFieldsError } from '../../api/models/user';
import { sqlNormalizeUser } from '../../api/Utils';
import Messages from '../../api/constants/Messages';

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

    onCreateUser = () => {
        if (this.validateUser()) {
            // const normalizedFields = sqlNormalizeUser(false, {
            //     ...this.state.fields,
            //     password: hash,
            // });
            const normalizedFields = sqlNormalizeUser(false, this.state.fields);
            axios.post('/api/users/create', normalizedFields)
                .then(response => {
                    this.toggleUserModal();
                    this.props.onCreateUser(true);
                    this.props.onOpenMessage(Messages.CREATE_USER_SUCCESS);
                    this.props.refreshUsers();
                })
                .catch(err => console.warn(err))
            // bcrypt.hash(this.state.fields.password, 10)
            //     .then(hash => {
                    
            //     })
            //     .catch(err => console.error(err))
            
        }
    };

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
