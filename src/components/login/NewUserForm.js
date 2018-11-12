import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { displayLabel } from '../../api/Labels';

export const NewUserForm = props =>
    <React.Fragment>
        <Form>
            <Form.Group>
                <Form.Field width={5}>
                    <Form.Input fluid type='text' name='firstname' label='First Name' placeholder='First Name' error={props.error.firstname} value={props.fields.firstname} onChange={props.onFieldChange} />
                    <Label basic pointing color='red' content='Required' style={displayLabel(props.error.firstname)} />
                </Form.Field>
                <Form.Field width={5}>
                    <Form.Input fluid type='text' name='lastname' label='Last Name' placeholder='Last Name' error={props.error.lastname} value={props.fields.lastname} onChange={props.onFieldChange} />
                    <Label basic pointing color='red' content='Required' style={displayLabel(props.error.lastname)} />
                </Form.Field>
                <Form.Field width={6}>
                    <Form.Input fluid type='email' name='email' label='Email' placeholder='Email' error={props.error.email} value={props.fields.email} onChange={props.onFieldChange} />
                    <Label basic pointing color='red' content='Required' style={displayLabel(props.error.email)} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <Form.Input fluid type='password' name='password' label='Password' placeholder='Password' error={props.error.password} value={props.fields.password} onChange={props.onFieldChange} />
                    <Label basic pointing color='red' content='Must be at least 6 characters' style={displayLabel(props.error.password)} />
                </Form.Field>
                <Form.Field>
                    <Form.Input fluid type='password' name='confirmation' label='Confirm Password' placeholder='Confirm Password' error={props.confirmation.error} value={props.confirmation.field} onChange={props.onFieldChange} />
                    <Label basic pointing color='red' content='Passwords must match' style={displayLabel(props.confirmation.error)} />
                </Form.Field>
            </Form.Group>
        </Form>
    </React.Fragment>;

NewUserForm.propTypes = {
    fields: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    error: PropTypes.shape({
        firstname: PropTypes.bool,
        lastname: PropTypes.bool,
        email: PropTypes.bool,
        password: PropTypes.bool,
    }).isRequired,
    confirmation: PropTypes.shape({
        field: PropTypes.string,
        error: PropTypes.bool,
    }).isRequired,
    onFieldChange: PropTypes.func.isRequired,
};