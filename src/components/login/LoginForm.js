/**
 * @file
 * @summary Creates a Login Form Component
 */

import React from 'react';
import { Form, Segment, Message, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { displayLabel } from '../../api/Labels';

/**
 * @export
 * @function LoginForm
 * @summary Implements the login form for logging into the app
 * 
 * @param {Object} props - the available props
 * @property {Boolean} props.loginError - whether the error is displayed on the component
 * @property {User} props.fields - the value of the fields
 * @property {Function} props.onFieldChange - an event handler to update the value of the fields
 * 
 * @returns {FSC} <LoginForm />
 */
export const LoginForm = props =>
    <React.Fragment>
        <Segment basic padded={false} style={{ display: !props.loginError ? 'none' : 'block' }}>
            <Message size='tiny' hidden={!props.loginError} color='red' header='Your username and/or password is incorrect' />
        </Segment>
        <Form style={{ paddingBottom: '0' }}>
            <Form.Field>
                <Form.Input fluid type='email' name='email' label='Email' placeholder='Email' error={props.error.email} value={props.fields.email} onChange={props.onFieldChange} />
                <Label basic pointing color='red' content='Required' style={displayLabel(props.error.email)} />
            </Form.Field>
            <Form.Field>
                <Form.Input fluid type='password' name='password' label='Password' placeholder='Password' error={props.error.password} value={props.fields.password} onChange={props.onFieldChange} />
                <Label basic pointing color='red' content='Required' style={displayLabel(props.error.password)} />
            </Form.Field>
        </Form>
    </React.Fragment>;

LoginForm.defaultProps = {
    loginError: false,
};

LoginForm.propTypes = {
    loginError: PropTypes.bool,
    fields: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onFieldChange: PropTypes.func.isRequired,
};