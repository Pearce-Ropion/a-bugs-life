import React from 'react';
import { Grid, Table, Dropdown, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { UserDropdownOptions, UserTypes } from '../../api/constants/Users';
import { sqlNormalizeUser, sqlNormalizeUserUpdate, getUser } from '../../api/Utils';

export class UsersPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: this.props.users,
        };
    };

    static defaultProps = {
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            email: PropTypes.string,
            role: PropTypes.oneOf(Object.values(UserTypes)),
        })),
    }

    onUpdateRole = (event, data) => {
        const user = sqlNormalizeUserUpdate({
            ...this.props.users.find(next => next.id === data.id),
            role: getUser(data.value)
        });
        console.log(user);
        axios.post('api/users/update', user)
            .then(response => response.data)
            .then(response => {

            })
            .catch(err => console.warn(err));
    }

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
                                                    value={user.role.name}
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
