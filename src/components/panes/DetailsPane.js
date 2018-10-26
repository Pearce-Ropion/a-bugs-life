import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketList } from '../TicketList';
import { TicketDetails } from '../TicketDetails';
import TicketProps from '../../api/constants/TicketProps';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes } from '../../api/constants/Users';

export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    static propTypes = {
        tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
        labels: PropTypes.object,
        view: PropTypes.oneOf(Object.values(TicketViews)),
    };

    filterTickets = () => {
        const { view } = this.props;
        if (view === TicketViews.ALL) {
            return this.props.tickets;
        } else if (view === TicketViews.ASSIGNED) {
            return this.props.tickets.filter(ticket => ticket.assignee.type === this.props.currentUser.type);
        } else if (view === TicketViews.REPORTED) {
            return this.props.tickets.filter(ticket => ticket.reporter.type === this.props.currentUser.type);
        }
        return [];
    }

    render = () => {
        return (
            <Grid centered id='details'>
                <Grid.Column width={4}>
                    <TicketList tickets={this.filterTickets()} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <TicketDetails ticket={this.filterTickets()[0]} labels={this.props.labels} />
                </Grid.Column>
            </Grid>
        );
    };
};
    