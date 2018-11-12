import React from 'react';
import { Grid, Button, Message, Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Post } from 'react-axios';
import memoize from 'memoize-one';

import { TicketList } from '../TicketList';
import { TicketDetails } from '../TicketDetails';
import TicketProps from '../../api/constants/TicketProps';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes, UserProps } from '../../api/constants/Users';
import { getUser } from '../../api/Utils';
import { TicketMenu } from '../TicketMenu';

export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTicketId: this.props.tickets.length ? this.props.tickets[0].id : null,
        };
    };

    static propTypes = {
        currentUser: PropTypes.shape(UserProps),
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
            filtered = tickets.filter(ticket => ticket.assignee === this.props.currentUser.name);
        } else if (view === TicketViews.REPORTED) {
            filtered = tickets.filter(ticket => ticket.reporter === this.props.currentUser.name);
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
        let { activeTicketId } = this.state;
        const filtered = this.filterTickets(this.props.tickets)
        const tickets = Object.values(filtered);
        if (tickets.length) {
            if (tickets.find(ticket => ticket.id === activeTicketId) === undefined) {
                activeTicketId = tickets[0].id
            }
            return <Grid centered id='details'>
                <Grid.Column width={4}>
                    <TicketList tickets={filtered} changeTicket={this.changeTicket} />
                </Grid.Column>
                <Grid.Column width={this.props.currentUser.role === UserTypes.USER ? 12 : 9}>
                    <TicketDetails ticket={filtered[activeTicketId]} />
                </Grid.Column>
                {
                    this.props.currentUser.role !== UserTypes.USER &&
                        <Grid.Column width={3}>
                            <TicketMenu 
                                ticket={filtered[activeTicketId]}
                                users={this.props.users}
                                labels={this.props.labels}
                                currentUser={this.props.currentUser}
                                onOpenMessage={this.props.onOpenMessage}
                                refreshTickets={this.props.refreshTickets} />
                        </Grid.Column>
                }
            </Grid>
        } else {
            return (
                <Grid centered>
                    <Grid.Column width={12}>
                        <Segment basic content={<Message warning header='There are no tickets available' content='Create a ticket using the button above' />} />
                    </Grid.Column>
                </Grid>
            );
        }
    };
};
    