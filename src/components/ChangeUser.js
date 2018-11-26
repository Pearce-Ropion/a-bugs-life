import React from 'react';
import PropTypes from 'prop-types';
import { Portal, Segment, Dropdown } from 'semantic-ui-react';

import { CurrentUserProps } from '../api/constants/Users';

export const ChangeUser = props =>
    <Portal open={true}>
        <Segment style={{ width: '13%', position: 'fixed', bottom: '3%', top: 'auto', zIndex: 1000, right: '3%' }}>
            <Dropdown selection search fluid compact
                options={[
                    { key: 'manager', value: 'Manager', text: 'Manager' },
                    { key: 'tester', value: 'Tester', text: 'Tester' },
                    { key: 'developer', value: 'Developer', text: 'Developer' },
                    { key: 'user', value: 'User', text: 'User' },
                    { key: 'none', value: 'None', text: 'None' },
                ]}
                value={props.currentUser.role.name}
                onChange={props.onUserChange} />
        </Segment>
    </Portal>;


ChangeUser.propTypes = {
    currentUser: PropTypes.shape(CurrentUserProps).isRequired,
    onUserChange: PropTypes.func.isRequired,
};