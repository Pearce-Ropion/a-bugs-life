/**
 * @file
 * @summary Implements the Login Handler Class
 */

import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginForm } from './LoginForm';
import { NewUserHandler } from './NewUserHandler';
import { userFields, userFieldsError } from '../../api/models/user';    

/**
 * @export
 * @class LoginHandler
 * @summary Implements logging into the application
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.isLoggedIn - whether the use is logged in
 * @property {Boolean} props.loginError - whether to display a log in error
 * @property {Boolean} props.isLoginModalOpen - whether the login modal is open
 * @property {Boolean} props.isUserModalOpen - whether the user creation modal is open
 * @property {Function} props.toggleLoginModal - an event handler to toggle the visiblity of the login modal
 * @property {Function} props.toggleUserModal - an event handler to toggle the visiblity of the user creation modal
 * @property {Function} props.onLogin - an event handler to request a login action
 * @property {Function} props.onLogout - an event handler to request a logout action
 * @property {Function} props.onOpenMessage - an event handler to open the specified message in portal
 * @property {Function} props.refreshUsers - an event handler to refresh the user list
 * @property {Function} props.onCreateUser - an event handler to request a user creation action
 * 
 * @returns {React.Component} <LoginHandler />
 */
export class LoginHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: userFields({}),
            error: userFieldsError({}),
        };
    };

    /**
     * @function onFieldChange
     * @summary Updates the value of the field
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new value
     */
    onFieldChange = (event, data) => {
        this.setState({
            fields: userFields({
                ...this.state.fields,
                [data.name]: data.value,
                role: this.state.fields.role.name,
            }),
        });
    };

    /**
     * @function toggleLoginModal
     * @summary Toggles the visibility of the login modal
     */
    toggleLoginModal = () => {
        this.setState({
            fields: userFields({}),
            error: userFieldsError({}),
        });
        this.props.toggleLoginModal();
    }

    /**
     * @function validateUser
     * @summary Checks that all fields have information entered correctly
     * 
     * @returns {Boolean} Whether the user information is valid
     */
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

    /**
     * @function onLogin
     * @summary Sends a login action after validating the fields
     */
    onLogin = () => {
        if (this.validateUser()) {
            this.props.onLogin(this.state.fields);
        }
    };

    /**
     * @function onCreateUser
     * @summary Event handler to toggle the login modal 
     */
    onCreateUser = () => {
        this.toggleLoginModal();
    }

    /**
     * @function render
     * @summary Renders the component
     */
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
