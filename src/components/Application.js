import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Navigation } from './Navigation';
import { CreatePane } from './panes/CreatePane';
import { DetailsPane } from './panes/DetailsPane';

import { UserTypes } from '../api/constants/Users';
import { Panes, TicketViews } from '../api/constants/Panes';
import { getAllLabels, getUser } from '../api/Utils';
import { userFields } from '../api/models/user';
import { UsersPane } from './panes/UsersPane';
import { getTickets, getUsers } from '../api/getData';
import { MessagePortal } from './MessagePortal';
import Messages from '../api/constants/Messages';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.tickets = [];
        this.users = [];
        this.labels = [],
        this.state = {
            isMessageOpen: false,
            isLoginModalOpen: false,
            isUserModalOpen: false,
            loginError: false,
            isLoggedIn: false,
            message: Messages.CREATE_TICKET_SUCCESS,
            users: [],
            tickets: [],
            currentUser: UserTypes.NONE,
            activePane: Panes.CREATE,
            activeView: TicketViews.NONE,
        }
    }

    componentDidMount = () => {
        if (!this.tickets.length) {
            getTickets()
                .then(response => {
                    this.tickets = response.data;
                    this.setState({
                        tickets: response.data,
                    });
                })
                .catch(err => console.warn(err));
        }

        if (!this.users.length) {
            getUsers()
                .then(response => {
                    this.users = response.data;
                    this.setState({
                        users: response.data,
                    });
                })
                .catch(err => console.warn(err));
        }
        this.labels = getAllLabels(this.tickets);
    }

    refreshTickets = () => {
        getTickets()
            .then(response => {
                this.tickets = response.data;
                this.setState({
                    tickets: response.data,
                });
            })
            .catch(err => console.warn(err));
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isUserModalOpen: !this.state.isUserModalOpen,
        });
    };

    onLogin = fields => {
        axios.post('/api/users/get', {
            email: fields.email,
            password: fields.password,
        })
            .then(response => response.data)
            .then(response => {
                if (response.valid) {
                    const user = response.user;
                    this.setState({
                        currentUser: getUser(user.role),
                        isLoggedIn: true,
                        isLoginModalOpen: false,
                        loginError: false,
                        activePane: Panes.DETAILS,
                        activeView: TicketViews.ALL,
                    });

                    if (user.role === UserTypes.USER) {
                        this.setState({
                            activeView: TicketViews.REPORTED,
                        });
                    }
                } else {
                    this.setState({
                        loginError: true,
                    });
                }
            })
            .catch(err => console.warn(err));
    };
    
    onLogout = () => {
        this.setState({
            currentUser: UserTypes.NONE,
            isLoggedIn: false,
            activePane: Panes.CREATE,
        });
    };

    onCreateUser = valid => {
        
    }

    onOpenMessage = message => {
        const self = this;
        this.setState({
            isMessageOpen: true,
            message,
        });
        setTimeout(() => {
            self.onCloseMessage();
        }, 3000);
    }

    onCloseMessage = () => {
        this.setState({
            isMessageOpen: false,
        })
    }

    getActivePane = () => {
        const { activePane } = this.state;
        if (activePane === Panes.CREATE) {
            return <CreatePane onOpenMessage={this.onOpenMessage} refreshTickets={this.refreshTickets} />
        } else if (activePane === Panes.DETAILS) {
            return <DetailsPane
                view={this.state.activeView}
                currentUser={this.state.currentUser}
                onOpenMessage={this.onOpenMessage}
                refreshTickets={this.refreshTickets}
                tickets={this.tickets}
                users={this.users}
                labels={this.labels} />
        } else if (activePane === Panes.USERS) {
            return <UsersPane users={this.users} />
        }
        return null;
    };

    changeActivePane = (event, data) => {
        this.setState({
            activePane: Panes[data.name.toUpperCase()],
            activeView: TicketViews.NONE,
        });
    };

    changeActiveView = (event, data) => {
        this.setState({
            activePane: Panes.DETAILS,
            activeView: TicketViews[data.name.toUpperCase()],
        });
    };

    render = () => (
        <React.Fragment>
            <Navigation
                activePane={this.state.activePane}
                currentUser={this.state.currentUser}
                isLoggedIn={this.state.isLoggedIn} 
                isLoginModalOpen={this.state.isLoginModalOpen}
                isUserModalOpen={this.state.isUserModalOpen}
                loginError={this.state.loginError}
                onLogin={this.onLogin}
                onLogout={this.onLogout}
                onCreateUser={this.onCreateUser}
                toggleLoginModal={this.toggleLoginModal}
                toggleUserModal={this.toggleUserModal}
                changeActivePane={this.changeActivePane}
                changeActiveView={this.changeActiveView}
                onOpenMessage={this.onOpenMessage}
                refreshTickets={this.refreshTickets}
                labels={this.labels} />
            <MessagePortal
                isMessageOpen={this.state.isMessageOpen}
                message={this.state.message}
                onCloseMessage={this.onCloseMessage} />
            {
                this.getActivePane()
            }
        </React.Fragment>
            
    );
};