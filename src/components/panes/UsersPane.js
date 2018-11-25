import React from 'react';
import { Grid, Table, Dropdown, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { UserDropdownOptions, UserTypes } from '../../api/constants/Users';
import { sqlNormalizeUser, getUser } from '../../api/Utils';
import Messages from '../../api/constants/Messages';

export class UsersPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: this.props.users,
        };
    };

    static propTypes = {
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            email: PropTypes.string,
            role: PropTypes.oneOf(Object.values(UserTypes)),
        })),
        onOpenMessage: PropTypes.func.isRequired,
        refreshUsers: PropTypes.func.isRequired,
    };

    onUpdateRole = (event, data) => {
        const user = sqlNormalizeUser(true, {
            ...this.props.users.find(next => next.id === data.id),
            role: getRole(data.value),
        });
        axios.post('api/users/update', user)
            .then(response => {
                this.props.onOpenMessage(Messages.UPDATE_USER_ROLE_SUCCESS);
                this.props.refreshUsers();
            })
            .catch(err => {
                this.props.onOpenMessage(Messages.UPDATE_USER_ROLE_ERROR);
                console.warn('Error updating user role\n', err);
            });
    };

    render = () => {
        return (
            <Grid centered padded>
                <Grid.Column width={2} />
                <Grid.Column width={10}>
                    <Table compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email Address</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.props.users.map(user => {
                                    return (
                                        <Table.Row key={`user-${user.id}`}>
                                            <Table.Cell>{user.id}</Table.Cell>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>
                                                <Dropdown fluid compact selection search
                                                    id={user.id}
                                                    placeholder='Role'
                                                    value={user.role}
                                                    options={UserDropdownOptions}
                                                    onChange={this.onUpdateRole} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Message warning
                        header='Warning!'
                        content='Changing the role of a user will imediately update the role' />
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid>
        );
    };
};
