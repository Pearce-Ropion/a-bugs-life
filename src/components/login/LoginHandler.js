import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginForm } from './LoginForm';
import { NewUserHandler } from './NewUserHandler';
import { userFields, userFieldsError } from '../../api/models/user';    

export class LoginHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: userFields({}),
            error: userFieldsError({}),
        };
    };

    onFieldChange = (event, data) => {
        // console.log(this.state.fields)
        this.setState({
            fields: userFields({
                ...this.state.fields,
                [data.name]: data.value,
                role: this.state.fields.role.name,
            }),
        });
    };

    toggleLoginModal = () => {
        this.setState({
            fields: userFields({}),
            error: userFieldsError({}),
        });
        this.props.toggleLoginModal();
    }

    validateUser = () => {
        const newError = userFieldsError({});
        Object.entries(this.state.fields).forEach(([key, field]) => {
            if (key === 'email' || key === 'password') {
                if (field === '') {
                    newError[key] = true;
                }
            }
        });
        this.setState({
            error: newError,
        });
        return !Object.values(newError).includes(true);
    }

    onLogin = () => {
        if (this.validateUser()) {
            this.props.onLogin(this.state.fields);
        }
    };

    onCreateUser = () => {
        this.toggleLoginModal();
    }

    render = () => {
        return <Modal
            size='mini'
            className='login'
            open={this.props.isLoginModalOpen && !this.props.isLoggedIn}
            header='Login to A Bugs Life'
            trigger={
                !this.props.isLoggedIn
                    ? <Button basic inverted content='Log In' labelPosition='right' icon='sign-in' onClick={this.toggleLoginModal} />
                    : <Button basic inverted content='Log out' labelPosition='right' icon='sign-out' onClick={this.props.onLogout} />
            }
            content={
                <React.Fragment>
                    <LoginForm fields={this.state.fields} error={this.state.error} loginError={this.props.loginError} onFieldChange={this.onFieldChange} />
                    <NewUserHandler 
                        key='create-login-modal' 
                        isUserModalOpen={this.props.isUserModalOpen} 
                        toggleUserModal={this.props.toggleUserModal} 
                        onOpenMessage={this.props.onOpenMessage} 
                        refreshUsers={this.props.refreshUsers}
                        onCreateUser={this.onCreateUser} />
                </React.Fragment>
            }
            actions={[
                <Button key='cancel-login-modal' content='Cancel' onClick={this.toggleLoginModal} />,
                <Button key='login-login-modal' content='Login' onClick={this.onLogin} positive />,
            ]} />;
    };
}

LoginHandler.defaultProps = {
    isLoggedIn: false,
    loginError: false,
    isLoginModalOpen: false,
    isUserModalOpen: false,
}

LoginHandler.propTypes = {
    isLoggedIn: PropTypes.bool,
    loginError: PropTypes.bool,
    isLoginModalOpen: PropTypes.bool,
    isUserModalOpen: PropTypes.bool,
    toggleLoginModal: PropTypes.func,
    toggleUserModal: PropTypes.func,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    onOpenMessage: PropTypes.func,
    refreshUsers: PropTypes.func,
    onCreateUser: PropTypes.func,
}
