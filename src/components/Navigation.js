import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketModal } from './TicketModal';
import { Login } from './login/Login';
import { UserTypes } from '../api/constants/Users';
import { TicketHandler } from './TicketHandler';
import { Panes } from '../api/constants/Panes';

export const Navigation = props =>
    <Grid id='heading' padded>
        <Grid.Column width={10}>
            {
                (props.activePane === Panes.CREATE || props.currentUser === UserTypes.USER) && <Header as='h1' inverted content={`A Bug's Life`} />
            }
            {
                props.isLoggedIn && props.currentUser !== UserTypes.USER
                    ? <React.Fragment>
                        <Button basic inverted content='Dashboard' name='dashboard' onClick={props.changeActivePane} />
                        <Button basic inverted content='View All' name='all' onClick={props.changeActiveView} />
                        <Button basic inverted content='Assigned' name='assigned' onClick={props.changeActiveView} />
                        <Button basic inverted content='Reported' name='reported' onClick={props.changeActiveView} />
                    </React.Fragment>
                    : null
            }
        </Grid.Column>
        <Grid.Column width={6} className='right'>
            {
                props.isLoggedIn && <Header as='h5' inverted textAlign='left' content={`Welcome, ${props.currentUser.name}`} style={{ display: 'inline-block', marginRight: '2em' }} />
            }
            {
                props.activePane !== Panes.CREATE && <TicketHandler isModal labels={props.labels} />
            }
            <Login 
                currentUser={props.currentUser}
                isLoggedIn={props.isLoggedIn}
                isLoginModalOpen={props.isLoginModalOpen}
                isUserModalOpen={props.isUserModalOpen}
                loginError={props.loginError}
                onLogin={props.onLogin}
                onLogout={props.onLogout}
                toggleLoginModal={props.toggleLoginModal}
                toggleUserModal={props.toggleUserModal} />
        </Grid.Column>
    </Grid>

Navigation.propTypes = {
    currentUser: PropTypes.oneOf(Object.values(UserTypes)),
    isLoggedIn: PropTypes.bool,
    isLoginModalOpen: PropTypes.bool,
    isUserModalOpen: PropTypes.bool,
    loginError: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    toggleLoginModal: PropTypes.func,
    toggleUserModal: PropTypes.func,
};
