import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginForm } from './LoginForm';

export const Login = props =>
    props.isLoggedIn
        ? <Button content='Log In' labelPosition='right' icon='sign-in' onClick={props.onToggleLoginModal} />
        : <Button content='Log out' labelPosition='right' icon='sign-out' onClick={props.onToggleLoginModal} /> 


export const LoginModal = props =>
        <Modal
            size='mini'
            className='login'
            closeIcon
            header='Login to A Bugs Life'
            trigger={<Button basic inverted content='Log In' labelPosition='right' icon='sign-in' onClick={props.onToggleLoginModal} />}
            content={<LoginForm data={props.loginForm} />}
            actions={[
                <Button key='login-login-modal' content='Login' onClick={props.onLoginSubmit} positive />
            ]} />