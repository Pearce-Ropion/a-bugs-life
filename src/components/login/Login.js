import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginForm } from './LoginForm';
import { userFields } from '../../api/models/user';    

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: userFields({}),
        };
    };

    onFieldChange = (event, data) => {
        this.setState({
            fields: userFields({
                ...this.state.fields,
                [data.name]: data.value,
            }),
        });
    };

    onLogin = () => {
        this.props.onLogin(this.state.fields);
        this.setState({
            fields: userFields({}),
        });
    };

    render = () => {
        return <Modal
            size='mini'
            className='login'
            open={this.props.isLoginModalOpen && !this.props.isLoggedIn}
            header='Login to A Bugs Life'
            trigger={
                !this.props.isLoggedIn
                    ? <Button basic inverted content='Log In' labelPosition='right' icon='sign-in' onClick={this.props.toggleLoginModal} />
                    : <Button basic inverted content='Log out' labelPosition='right' icon='sign-out' onClick={this.props.onLogout} />
            }
            content={
                <LoginForm fields={this.state.fields} loginError={this.props.loginError} onFieldChange={this.onFieldChange} />
            }
            actions={[
                <Button key='cancel-login-modal' content='Cancel' onClick={this.props.toggleLoginModal} />,
                <Button key='login-login-modal' content='Login' onClick={this.onLogin} positive />,
            ]} />;
    };
}

Login.defaultProps = {
    isLoggedIn: false,
    loginError: false,
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool,
    loginError: PropTypes.bool,
    toggleLoginModal: PropTypes.func,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
}
