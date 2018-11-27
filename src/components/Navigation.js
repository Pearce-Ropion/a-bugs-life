/**
 * @file
 * @summary Creates a Navigation component
 */

import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginHandler } from './login/LoginHandler';
import { TicketHandler } from './ticket/TicketHandler';

import { UserTypes, UserProps } from '../api/constants/Users';
import { Panes, TicketViews } from '../api/constants/Panes';
import { LabelProps } from '../api/Labels';

/**
 * @function Navigation
 * @summary Creates a navigation header
 * 
 * @param {Object} props 
 * @property {Object} labels - all the labels
 * @property {Array} users - all the users
 * @property {Object} currentUser - the current user
 * @property {Symbol} activePane - the active pane
 * @property {Symbol} activeView - the active ticket view
 * @property {Boolean} isLoggedIn - whether the user is logged in
 * @property {Boolean} isLoginModalOpen - whether the login modal is open
 * @property {Boolean} isUserModalOpen - whether the user creation modal is open
 * @property {Boolean} isLoggedIn - wether the login error is shown
 * @property {Function} onLogin - an event handler for when a user logins
 * @property {Function} onLogout - an event handler for when a user logs out
 * @property {Function} toggleLoginModal - an event handler to toggle the visibility of the login modal
 * @property {Function} toggleUserModal - an event handler to toggle the visibility of the user creation modal
 * @property {Function} changeActivePane - an event handler to change the current pane
 * @property {Function} changeActiveView - an event handler to change the curtten view
 * @property {Function} onOpenMessage - an event handler to open the specified message
 * @property {Function} onCreateUser - an event handler create a user
 * @property {Function} refreshTickets - an event handler to refresh the ticket list
 * @property {Function} refreshUsers - an event handler to refresh the user list
 * 
 * @returns {FSC} <Navigation />
 */
export const Navigation = props =>
    <Grid id='heading' padded>
        <Grid.Column width={10}>
            {
                (props.activePane === Panes.CREATE || props.currentUser.role === UserTypes.USER) && <Header as='h1' inverted content={`A Bug's Life`} />
            }
            {
                props.currentUser.role === UserTypes.MANAGER &&
                    <Button basic inverted
                        color={props.activePane === Panes.DASHBOARD ? 'olive' : null}
                        content='Dashboard'
                        name='dashboard'
                        onClick={props.changeActivePane} />
            }
            {
                props.isLoggedIn && props.currentUser.role !== UserTypes.USER &&
                    <React.Fragment>
                        <Button basic inverted
                            color={props.activeView === TicketViews.ALL ? 'olive' : null}
                            content='View All'
                            name='all'
                            onClick={props.changeActiveView} />
                        <Button basic inverted
                            color={props.activeView === TicketViews.ASSIGNED ? 'olive' : null}
                            content='Assigned'
                            name='assigned'
                            onClick={props.changeActiveView} />
                        <Button basic inverted
                            color={props.activeView === TicketViews.REPORTED ? 'olive' : null}
                            content='Reported'
                            name='reported'
                            onClick={props.changeActiveView} />
                    </React.Fragment>
            }
            {
                props.currentUser.role === UserTypes.MANAGER &&
                    <Button basic inverted
                        color={props.activePane === Panes.USERS ? 'olive' : null}
                        content='Users'
                        name='users'
                        onClick={props.changeActivePane} />
            }
        </Grid.Column>
        <Grid.Column width={6} className='right'>
            {
                props.isLoggedIn && <Header as='h5' inverted textAlign='left' content={`Welcome, ${props.currentUser.name}`} style={{ display: 'inline-block', marginRight: '2em' }} />
            }
            {
                props.activePane !== Panes.CREATE &&
                    <TicketHandler isModal
                        labels={props.labels}
                        users={props.users}
                        currentUser={props.currentUser}
                        onOpenMessage={props.onOpenMessage}
                        refreshTickets={props.refreshTickets} />
            }
            <LoginHandler 
                currentUser={props.currentUser}
                isLoggedIn={props.isLoggedIn}
                isLoginModalOpen={props.isLoginModalOpen}
                isUserModalOpen={props.isUserModalOpen}
                loginError={props.loginError}
                onLogin={props.onLogin}
                onLogout={props.onLogout}
                onOpenMessage={props.onOpenMessage}
                onCreateUser={props.onCreateUser}
                refreshUsers={props.refreshUsers}
                toggleLoginModal={props.toggleLoginModal}
                toggleUserModal={props.toggleUserModal} />
        </Grid.Column>
    </Grid>

Navigation.propTypes = {
    labels: LabelProps,
    users: PropTypes.shape(UserProps),
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.oneOf(Object.values(UserTypes)),
    }),
    activePane: PropTypes.oneOf(Object.values(Panes)),
    activeView: PropTypes.oneOf(Object.values(TicketViews)),
    isLoggedIn: PropTypes.bool,
    isLoginModalOpen: PropTypes.bool,
    isUserModalOpen: PropTypes.bool,
    loginError: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    toggleLoginModal: PropTypes.func,
    toggleUserModal: PropTypes.func,
    changeActivePane: PropTypes.func,
    changeActiveView: PropTypes.func,
    onOpenMessage: PropTypes.func,
    onCreateUser: PropTypes.func,
    refreshTickets: PropTypes.func,
    refreshUsers: PropTypes.func,
};
