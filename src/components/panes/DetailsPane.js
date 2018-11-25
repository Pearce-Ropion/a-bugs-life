import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message, Segment, Input, Dropdown, Button, Divider, Container } from 'semantic-ui-react';
import _ from 'lodash';
import memoize from 'memoize-one';

import { TicketList } from '../TicketList';
import { TicketDetails } from '../TicketDetails';
import TicketProps from '../../api/constants/TicketProps';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes, CurrentUserProps } from '../../api/constants/Users';
import { TicketMenu } from '../TicketMenu';
import { TicketSorter } from '../TicketSorter';
import { sortDDoptions, sortOptions } from '../../api/DropdownOptions';
import { getTicketKey } from '../../api/Utils';
import { LabelProps } from '../../api/Labels';

export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: '',
            searching: false,
            search: {
                search: '',
                category: '',
            },
        };
    };

    static propTypes = {
        currentUser: PropTypes.shape(CurrentUserProps),
        tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
        activeTicket: PropTypes.number.isRequired,
        labels: LabelProps,
        view: PropTypes.oneOf(Object.values(TicketViews)),
        onChangeTicket: PropTypes.func.isRequired,
    };
    
    filterTickets = tickets => {
        const { view } = this.props;
        let filtered = [];
        // const filteredTickets = {};

        if (view === TicketViews.ALL) {
            filtered = tickets;
        } else if (view === TicketViews.ASSIGNED) {
            filtered = tickets.filter(ticket => ticket.assignee === this.props.currentUser.name || ticket.assignee === this.props.currentUser.role.name);
        } else if (view === TicketViews.REPORTED) {
            filtered = tickets.filter(ticket => ticket.reporter === this.props.currentUser.name || ticket.reporter === 'Anonymous' || ticket.reporter === this.props.currentUser.role.name);
        }

        if (this.state.search.search !== '' && this.state.searching) {
            const re = new RegExp(_.escapeRegExp(this.state.search.search), 'i');
            filtered = _.filter(filtered, ticket => re.test(ticket[this.state.search.category]));
        }

        if (!filtered) {
            filtered = [];
        } else {
            const { sortBy } = this.state;
            filtered = this.sortTickets(filtered, this.state.sortBy.length ? this.state.sortBy : 'modified');
            if (!sortBy.length || sortBy === 'modified' || sortBy === 'created') {
                filtered.reverse();
            }
        }
        const filterTickets = new Map();
        filtered.forEach(ticket => filterTickets.set(ticket.id, ticket));

        return filterTickets;
    };

    changeTicket = (event, data) => {
        this.props.onChangeTicket(data.ticketid);
    };

    onSortChange = (event, data) => {
        this.setState({
            sortBy: data.value,
        });
    };

    sortTickets = (tickets, category) =>
        sortOptions[category] === 'base'
            ? _.sortBy(tickets, [category])
            : _.sortBy(tickets, [ticket => getTicketKey[category](ticket[category])[sortOptions[category]]]);
        

    onSearchChange = (event, data) => {
        this.setState({
            search: {
                ...this.state.search,
                [data.name]: data.value,
            },
        });
    };

    onSearch = () => {
        if (this.state.search.search !== '') {
            this.setState({
                searching: true,
            });
        }
    };

    clearSearch = () => {
        this.setState({
            search: {
                search: '',
                category: '',
            },
            searching: false,
        });
    };

    render = () => {
        const categoryOptions = sortDDoptions();
        console.log(categoryOptions);
        let { activeTicket } = this.props;
        // console.log(activeTicket);
        const filtered = this.filterTickets(this.props.tickets) // Map
        const tickets = [...filtered.values()]; // Array
        if (tickets.length) {
            if (![...filtered.keys()].includes(activeTicket)) {
                activeTicket = tickets[0].id;
            }
            return <Grid centered id='details'>
                <Grid.Column width={4} style={{ paddingBottom: '0' }}>
                    <Segment.Group>
                        <TicketSorter sortCategory={this.state.sortBy} categoryOptions={categoryOptions} onSortChange={this.onSortChange} />
                        <TicketList tickets={tickets} changeTicket={this.changeTicket} />
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column width={this.props.currentUser.role === UserTypes.USER ? 12 : 9} style={{ paddingBottom: '0' }}>
                    <Segment.Group style={{ border: 'none', WebkitBoxShadow: 'none', boxShadow: 'none' }}>
                        <Segment basic>
                            <Container>
                                <Input fluid
                                    value={this.state.search.search}
                                    placeholder='Search...'
                                    name='search'
                                    onChange={this.onSearchChange}
                                    action={
                                        <React.Fragment>
                                            <Dropdown compact selection button
                                                name='category'
                                                placeholder='category'
                                                content='Category'
                                                value={this.state.search.category}
                                                options={categoryOptions.slice(0, 4).concat(categoryOptions.slice(6, 8))}
                                                onChange={this.onSearchChange} />
                                            {
                                                this.state.searching
                                                    ? <Button content='Clear' icon='close' labelPosition='right' color='red' onClick={this.clearSearch} />
                                                    : <Button content='Search' icon='search' labelPosition='right' color='teal' onClick={this.onSearch} />
                                            }
                                        </React.Fragment>
                                    } />
                            </Container>
                        </Segment>
                        <Divider fitted />
                        <Segment basic padded>
                            <TicketDetails ticket={filtered.get(activeTicket)} />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
                {
                    this.props.currentUser.role !== UserTypes.USER &&
                        <Grid.Column width={3} style={{ paddingBottom: '0' }}>
                            <TicketMenu
                                ticket={filtered.get(activeTicket)}
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
    