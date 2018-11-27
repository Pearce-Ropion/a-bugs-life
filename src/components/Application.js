/**
 * @file
 * @summary Creates the Application and manages all transitions and high level interactions
 */

import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { Navigation } from './Navigation';
import { MessagePortal } from './MessagePortal';
import { CreatePane } from './panes/CreatePane';
import { DetailsPane } from './panes/DetailsPane';
import { UsersPane } from './panes/UsersPane';
import { DashboardPane } from './panes/DashboardPane';

import { UserTypes } from '../api/constants/Users';
import { Panes, TicketViews } from '../api/constants/Panes';
import { getRole } from '../api/Utils';
import { getAllLabels } from '../api/Labels';
import { getTickets, getUsers } from '../api/getData';
import Messages from '../api/constants/Messages';

/**
 * @export
 * @class Application
 * @summary Manages all transitions and high level interactions
 * 
 * @returns <Application />
 */
export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.tickets = [];
        this.users = [];
        this.labels = {};
        this.state = {
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

    /**
     * @function componentDidMount
     * @summary refreshes the tickets and users when the component mounts
     */
    componentDidMount = () => {
        if (!this.tickets.length) {
            this.refreshTickets()
        }

        if (!this.users.length) {
            this.refreshUsers()
        }
    }

    /**
     * @function refreshTickets
     * @summary refreshes the ticket list and label array
     */
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

    /**
     * @function refreshUsers
     * @summary refreshes the user list
     */
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

    /**
     * @function toggleLoginModal
     * @summary Toggles the visibility of the login modal
     */
    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    };

    /**
     * @function toggleUserModal
     * @summary Toggles the visibility of the user creation modal
     */
    toggleUserModal = () => {
        this.setState({
            isUserModalOpen: !this.state.isUserModalOpen,
        });
    };

    /**
     * @function onLogin
     * @summary Checks whether the user logging in is a real user and whether the credentials are correct. Logs in the user
     * 
     * @param {Object} fields - the fields from the login modal
     */
    onLogin = fields => {
        this.setState({
            loginError: false,
        });
        axios.post('/api/users/get', {
            email: fields.email,
        })
            .then(response => response.data)
            .then(response => {
                if (response.valid && bcrypt.compareSync(fields.password, response.user.password)) {
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
    
    /**
     * @function onLogout
     * @summary Logs out the current user
     */
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

    /**
     * @function onOpenMessage
     * @summary Opens the specified message
     */
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

    /**
     * @function onCloseMessage
     * @summary Closes the message pop up
     */
    onCloseMessage = () => {
        this.setState({
            isMessageOpen: false,
        })
    }

    /**
     * @function getActivePane
     * @summary Gets the active pane and passes relevant props
     * 
     * @returns {React.Component} The relevant pane
     */
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

    /**
     * @function changeActivePane
     * @summary updates the active pane
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.name - the new pane name
     */
    changeActivePane = (event, data) => {
        this.setState({
            activePane: Panes[data.name.toUpperCase()],
            activeView: TicketViews.NONE,
            activeTicket: -1,
        });
    };

    /**
     * @function changeActiveView
     * @summary updates the current ticket view
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new ticket view name
     */
    changeActiveView = (event, data) => {
        this.setState({
            activePane: Panes.DETAILS,
            activeView: TicketViews[data.name.toUpperCase()],
            activeTicket: -1,
        });
    };

    /**
     * @function onChangeTicket
     * @summary changes the current ticket
     * 
     * @param {Number|String} id - the id of the ticket to change to
     */
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

    /**
     * @function render
     * @summary Component renderer
     */
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
                this.getActivePane()
            }
        </React.Fragment>
            
    );
};