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
        <Grid.Column width={11}>
            {
                props.activePane === Panes.CREATE && <Header as='h1' inverted content={`A Bug's Life`} />
            }
            {
                props.isLoggedIn && props.currentUser !== UserTypes.USER
                    ? <React.Fragment>
                        <Button basic inverted content='Dashboard' name='dashboard' onClick={props.changeActivePane} />
                        <Button basic inverted content='Assigned' name='assigned' onClick={props.changeActiveView}  />
                        {/* <Button basic inverted content='Watched' name='watched' onClick={props.changeActiveView}  /> */}
                    </React.Fragment>
                    : null
            }
            {
                props.isLoggedIn
                    ? <React.Fragment>
                        <Button basic inverted content='Reported' name='reported' onClick={props.changeActiveView}  />
                        <Button basic inverted content='View All' name='all' onClick={props.changeActiveView}  />
                    </React.Fragment>
                    : null
            }
        </Grid.Column>
        <Grid.Column width={5} className='right'>
            {
                props.activePane !== Panes.CREATE && <TicketHandler isModal labels={props.labels} />
            }
            <Login 
                currentUser={props.currentUser}
                isLoggedIn={props.isLoggedIn}
                isLoginModalOpen={props.isLoginModalOpen}
                loginError={props.loginError}
                onLogin={props.onLogin}
                onLogout={props.onLogout}
                toggleLoginModal={props.toggleLoginModal} />
        </Grid.Column>
    </Grid>

Navigation.propTypes = {
    currentUser: PropTypes.oneOf(Object.values(UserTypes)),
    isLoggedIn: PropTypes.bool,
    isLoginModalOpen: PropTypes.bool,
    loginError: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    toggleLoginModal: PropTypes.func,
};
