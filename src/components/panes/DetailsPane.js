import React from 'react';
import { Grid, Button, Message, Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Post } from 'react-axios';
import memoize from 'memoize-one';

import { TicketList } from '../TicketList';
import { TicketDetails } from '../TicketDetails';
import TicketProps from '../../api/constants/TicketProps';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes } from '../../api/constants/Users';
import { getUser } from '../../api/Utils';
import { TicketMenu } from '../TicketMenu';

export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: this.filterTickets(),
            activeTicketId: this.props.tickets[0].id,
        };
    };

    static propTypes = {
        currentUser: PropTypes.shape({
            type: PropTypes.symbol,
        }),
        tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
        labels: PropTypes.object,
        view: PropTypes.oneOf(Object.values(TicketViews)),
    };
    
    filterTickets = tickets => {
        const { view } = this.props;
        let filtered = [];
        const filteredTickets = {};

        if (view === TicketViews.ALL) {
            filtered = tickets;
        } else if (view === TicketViews.ASSIGNED) {
            filtered = tickets.filter(ticket => getUser(ticket.assignee).type === this.props.currentUser.type);
        } else if (view === TicketViews.REPORTED) {
            console.log(view);
            filtered = tickets.filter(ticket => getUser(ticket.reporter).type === this.props.currentUser.type);
        }

        if (!filtered) {
            filtered = [];
        }

        filtered.forEach(ticket => {
            filteredTickets[ticket.id] = ticket;
        });

        return filteredTickets;
    };

    changeTicket = (event, data) => {
        this.setState({
            activeTicketId: data.ticketid,
        });
    }

    getCurrentTicket = tickets => {
    }

    render = () => {
        const filtered = this.filterTickets(this.props.tickets)
        if (Object.keys(filtered).length) {
            return <Grid centered id='details'>
                <Grid.Column width={4}>
                    <TicketList tickets={filtered} changeTicket={this.changeTicket} />
                </Grid.Column>
                <Grid.Column width={this.props.currentUser === UserTypes.USER ? 12 : 9}>
                    <TicketDetails ticket={filtered[this.state.activeTicketId]} />
                </Grid.Column>
                {
                    this.props.currentUser !== UserTypes.USER &&
                        <Grid.Column width={3}>
                            <TicketMenu 
                                ticket={filtered[this.state.activeTicketId]}
                                users={this.props.users}
                                labels={this.props.labels}
                                currentUser={this.props.currentUser}
                                onOpenMessage={this.props.onOpenMessage}
                                refreshTickets={this.props.refreshTickets} />
                        </Grid.Column>
                }
            </Grid>
        } else {
            return <Segment basic content={<Message warning header='There are no tickets available' content='Create a ticket using the button above' /> } />
        }
    };
};
    