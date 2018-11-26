import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

import { Navigation } from './Navigation';
import { MessagePortal } from './MessagePortal';
import { ChangeUser } from './ChangeUser';
import { CreatePane } from './panes/CreatePane';
import { DetailsPane } from './panes/DetailsPane';
import { UsersPane } from './panes/UsersPane';
import { DashboardPane } from './panes/DashboardPane';

import { UserTypes } from '../api/constants/Users';
import { Panes, TicketViews } from '../api/constants/Panes';
import { getRole } from '../api/Utils';
import { getAllLabels } from '../api/Labels';
import { getTickets, getUsers, genData } from '../api/getData';
import Messages from '../api/constants/Messages';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.tickets = [];
        this.users = [];
        this.labels = {};
        this.state = {
            debug: true,
            isMessageOpen: false,
            isLoginModalOpen: false,
            isUserModalOpen: false,
            loginError: false,
            isLoggedIn: false,
            message: Messages.CREATE_TICKET_SUCCESS,
            users: [],
            tickets: [],
            currentUser: {
                id: 0,
                name: 'User',
                email: 'u@u.com',
                role: UserTypes.NONE,
            },
            activePane: Panes.CREATE,
            activeView: TicketViews.NONE,
            activeTicket: -1,
        }
    }

    componentDidMount = () => {
        if (!this.tickets.length) {
            this.refreshTickets()
        }

        if (!this.users.length) {
            this.refreshUsers()
        }
    }

    refreshTickets = () => {
        getTickets()
            .then(response => {
                this.tickets = response.data;
                this.labels = getAllLabels(response.data);
                this.setState({
                    tickets: response.data,
                });
            })
            .catch(err => {
                console.warn('Error Fetching tickets onRefresh\n', err)
                this.tickets = [];
                this.setState({
                    tickets: [],
                });
            });
    }

    refreshUsers = () => {
        getUsers()
            .then(response => {
                this.users = response.data;
                this.setState({
                    users: response.data,
                });
            })
            .catch(err => {
                console.warn('Error Fetching User onMount\n', err)
                this.users = [];
                this.setState({
                    users: [],
                });
            });
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
                    this.setState({
                        currentUser: {
                            ...response.user,
                            role: getRole(response.user.role),
                        },
                        isLoggedIn: true,
                        isLoginModalOpen: false,
                        loginError: false,
                        activePane: Panes.DETAILS,
                        activeView: TicketViews.ALL,
                    });

                    if (getRole(response.user.role) === UserTypes.USER) {
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
            currentUser: {
                name: 'No Logged In',
                email: null,
                role: UserTypes.NONE,
            },
            isLoggedIn: false,
            activePane: Panes.CREATE,
        });
    };

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
            return <CreatePane
                users={this.users}
                labels={this.labels}
                currentUser={this.state.currentUser}
                onOpenMessage={this.onOpenMessage}
                refreshTickets={this.refreshTickets} />
        } else if (activePane === Panes.DETAILS) {
            return <DetailsPane
                view={this.state.activeView}
                currentUser={this.state.currentUser}
                onOpenMessage={this.onOpenMessage}
                refreshTickets={this.refreshTickets}
                tickets={this.tickets}
                users={this.users}
                labels={this.labels}
                onChangeTicket={this.onChangeTicket}
                activeTicket={this.state.activeTicket} />
        } else if (activePane === Panes.USERS) {
            return <UsersPane
                users={this.users}
                onOpenMessage={this.onOpenMessage}
                refreshUsers={this.refreshUsers} />
        } else if (activePane === Panes.DASHBOARD) {
            return <DashboardPane tickets={this.tickets} onOpenTicket={this.onChangeTicket} />
        }
        return null;
    };

    changeActivePane = (event, data) => {
        this.setState({
            activePane: Panes[data.name.toUpperCase()],
            activeView: TicketViews.NONE,
            activeTicket: -1,
        });
    };

    changeActiveView = (event, data) => {
        this.setState({
            activePane: Panes.DETAILS,
            activeView: TicketViews[data.name.toUpperCase()],
            activeTicket: -1,
        });
    };

    onUserChange = (event, data) => {
        if (data.value === 'None') {
            this.setState({
                currentUser: {
                    name: 'No Logged In',
                    email: null,
                    role: UserTypes.NONE,
                },
                isLoggedIn: false,
                activePane: Panes.CREATE,
            });
        } else {
            const user = this.users.find(user => user.role === data.value);
            this.setState({
                currentUser: {
                    ...user,
                    role: getRole(user.role),
                },
                isLoggedIn: true,
                loginError: false,
                activePane: Panes.DETAILS,
                activeView: TicketViews.ALL,
            });

            if (getRole(user.role) === UserTypes.USER) {
                this.setState({
                    activeView: TicketViews.REPORTED,
                });
            }
        }
        this.forceUpdate();
    };

    onChangeTicket = id => {
        if (this.state.activePane !== Panes.DETAILS) {
            this.setState({
                activePane: Panes.DETAILS,
                activeView: TicketViews.ALL,
            });
        }
        this.setState({
            activeTicket: id,
        });
    };

    generate = (event, data, counter = 1) => {
        if (counter < 200) {
            setTimeout(() => {
                const data = genData();
                axios.post('/api/tickets/create', data)
                    .then(() => {
                        console.log(data);
                        this.generate({}, {}, ++counter);
                    })
            }, 200);
        }
    };

    render = () => (
        <React.Fragment>
            <Navigation
                activePane={this.state.activePane}
                activeView={this.state.activeView}
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
                refreshUsers={this.refreshUsers}
                refreshTickets={this.refreshTickets}
                users={this.users}
                labels={this.labels} />
            <MessagePortal
                isMessageOpen={this.state.isMessageOpen}
                message={this.state.message}
                onCloseMessage={this.onCloseMessage} />
            {
                this.state.debug &&
                    <ChangeUser
                        currentUser={this.state.currentUser}
                        onUserChange={this.onUserChange} />
            }
            {
                this.getActivePane()
            }
            <Button onClick={this.generate} content='Generate' />
        </React.Fragment>
            
    );
};