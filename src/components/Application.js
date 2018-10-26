import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Navigation } from './Navigation';
import { CreatePane } from './panes/CreatePane';
import { DetailsPane } from './panes/DetailsPane';

import { getData } from '../api/getData';
import { UserTypes, Credentials } from '../api/constants/Users';
import { Panes, TicketViews } from '../api/constants/Panes';
import { getAllLabels } from '../api/Utils';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.tickets = getData(100),
        this.labels = getAllLabels(this.tickets),
        this.state = {
            currentUser: UserTypes.NONE,
            isLoggedIn: false,
            isLoginModalOpen: false,
            loginError: false,
            filtered: this.tickets,
            activePane: Panes.CREATE,
            activeView: TicketViews.NONE,
        }
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    };

    onLogin = fields => {
        const user = Object.values(Credentials).find(user => user.username === fields.username && user.password === fields.password);
        if (user !== undefined) {
            this.setState({
                currentUser: user.type,
                isLoggedIn: true,
                isLoginModalOpen: false,
                loginError: false,
                activePane: Panes.DETAILS,
                activeView: TicketViews.ALL,
            });
        } else {
            this.setState({
                loginError: true,
            });
        }
    };
    
    onLogout = () => {
        this.setState({
            currentUser: UserTypes.NONE,
            isLoggedIn: false,
            activePane: Panes.CREATE,
        });
    };

    getActivePane = () => {
        const { activePane } = this.state;
        if (activePane === Panes.CREATE) {
            return <CreatePane />
        } else if (activePane === Panes.DETAILS) {
            return <DetailsPane view={this.state.activeView} currentUser={this.state.currentUser} tickets={this.tickets} labels={this.labels} />
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
                loginError={this.state.loginError}
                onLogin={this.onLogin}
                onLogout={this.onLogout}
                toggleLoginModal={this.toggleLoginModal}
                changeActivePane={this.changeActivePane}
                changeActiveView={this.changeActiveView}
                labels={this.labels} />
            {
                this.getActivePane()
            }
        </React.Fragment>
            
    );
};