import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const LoginForm = props =>
    <Form>
        <Form.Input fluid type='email' label='Email' placeholder='Email' onChange={props.onFieldChange} />
        <Form.Input fluid type='password' label='Password' placeholder='Password' onChange={props.onFieldChange} />
    </Form>

LoginForm.propTypes = {
    onFieldChange: PropTypes.func,
}