import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const LoginForm = props =>
    <React.Fragment>
        <Message size='tiny' hidden={!props.loginError} color='red' header='Your username and/or password is incorrect' />
        <Form>
            <Form.Input fluid type='text' name='username' label='Username' placeholder='Username' value={props.fields.username} onChange={props.onFieldChange} />
            <Form.Input fluid type='password' name='password' label='Password' placeholder='Password' value={props.fields.password} onChange={props.onFieldChange} />
        </Form>
    </React.Fragment>;

LoginForm.defaultProps = {
    loginError: false,
};

LoginForm.propTypes = {
    loginError: PropTypes.bool,
    fields: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
    }),
    onFieldChange: PropTypes.func.isRequired,
};