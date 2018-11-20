import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LoginHandler } from './login/LoginHandler';
import { UserTypes } from '../api/constants/Users';
import { TicketHandler } from './TicketHandler';
import { Panes, TicketViews } from '../api/constants/Panes';

import { getUser } from '../api/Utils';

export const Navigation = props =>
    <Grid id='heading' padded>
        <Grid.Column width={10}>
            {
                (props.activePane === Panes.CREATE || props.currentUser.role === UserTypes.USER) && <Header as='h1' inverted content={`A Bug's Life`} />
            }
            {
                props.isLoggedIn && props.currentUser.role !== UserTypes.USER &&
                    <React.Fragment>
                        <Button basic inverted 
                            color={props.activePane === Panes.DASHBOARD ? 'olive' : null}
                            content='Dashboard'
                            name='dashboard'
                            onClick={props.changeActivePane} />
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
                onCreateUser={props.onCreateUser}
                toggleLoginModal={props.toggleLoginModal}
                toggleUserModal={props.toggleUserModal} />
        </Grid.Column>
    </Grid>

Navigation.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.oneOf(Object.values(UserTypes)),
    }),
    isLoggedIn: PropTypes.bool,
    isLoginModalOpen: PropTypes.bool,
    isUserModalOpen: PropTypes.bool,
    loginError: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    toggleLoginModal: PropTypes.func,
    toggleUserModal: PropTypes.func,
};
