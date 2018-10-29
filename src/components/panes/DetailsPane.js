import React from 'react';
import { Grid, Button, Message, Dimmer, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Post } from 'react-axios';

import { TicketList } from '../TicketList';
import { TicketDetails } from '../TicketDetails';
import TicketProps from '../../api/constants/TicketProps';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes } from '../../api/constants/Users';
import { getUser } from '../../api/Utils';

export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        // this.props.tickets = [];
        this.state = {
            fake: true,
            currentTicket: 0,
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
        if (view === TicketViews.ALL) {
            return tickets;
        } else if (view === TicketViews.ASSIGNED) {
            return tickets.filter(ticket => getUser(ticket.assignee).type === this.props.currentUser.type);
        } else if (view === TicketViews.REPORTED) {
            return tickets.filter(ticket => getUser(ticket.reporter).type === this.props.currentUser.type);
        }
        return [];
    }

    changeTicket = (event, data) => {
        const tickets = this.filterTickets(data.allTickets);
        const id = tickets.findIndex(ticket => ticket.id === data.ticketid)
        this.setState({
            currentTicket: id,
        });
    }

    render = () => {
        if (this.state.fake) {
            return <Grid centered id='details'>
                <Grid.Column width={4}>
                    <TicketList tickets={this.filterTickets(this.props.tickets)} changeTicket={this.changeTicket} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <TicketDetails ticket={this.filterTickets(this.props.tickets)[this.state.currentTicket]} labels={this.props.labels} currentUser={this.props.currentUser} />
                </Grid.Column>
            </Grid>
        } else {
            return <Post url='/tickets'>
                {(error, response, isLoading, onReload) => {
                    if (error) {
                        return <Segment basic content={<Message color='red' header='An error occured fetching the ticket list' />} />
                    } else if (isLoading) {
                        return (
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        );
                    } else if (response) {
                        console.log(response)
                        return (
                            <Grid centered id='details'>
                                <Grid.Column width={4}>
                                    <TicketList tickets={this.filterTickets(response.data)} changeTicket={this.changeTicket} />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <TicketDetails ticket={this.filterTickets(response.data)[this.state.currentTicket]} labels={this.props.labels} onReload={onReload} />
                                </Grid.Column>
                            </Grid>
                        );
                    } else {
                        return <Segment basic content={<Message color='orange' header='Dont want to see this' />} />
                    }
                }}
            </Post>
        }
    };
};
    