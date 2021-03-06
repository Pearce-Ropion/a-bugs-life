/**
 * @file
 * @summary Implements the Details Handler Class
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message, Segment, Divider } from 'semantic-ui-react';
import _ from 'lodash';
import memoize from 'memoize-one';

import { TicketList } from '../details/TicketList';
import { TicketDetails } from '../details/TicketDetails';
import { TicketMenu } from '../details/TicketMenu';
import { TicketSorter } from '../details/TicketSorter';
import { TicketSearch } from '../details/TicketSearch';

import TicketProps from '../../api/constants/TicketProps';
import { LabelProps } from '../../api/Labels';
import { TicketViews } from '../../api/constants/Panes';
import { UserTypes, CurrentUserProps, UserProps } from '../../api/constants/Users';
import { sortDDoptions, sortOptions } from '../../api/DropdownOptions';
import { getTicketKey } from '../../api/Utils';

/**
 * @export
 * @class DashboardPane
 * @summary Implements the details handler and renderer
 * 
 * @param {Object} props - the available props
 * @property {Object} props.currentUser - the current user
 * @property {Array} props.tickets - all the tickets
 * @property {Number|String} props.activeTicket - the active ticket to display
 * @property {Object} props.labels - all the labels
 * @property {Symbol} props.view - the current view
 * @property {Object} props.users - all the users
 * @property {Function} props.onOpenMessage - an event handler to open the specified messages
 * @property {Function} props.refreshTickets - an event handler to refresh the tickets list
 * @property {Function} props.onChangeTicket - an event handler to change the ticket
 * 
 * @returns {React.Component} <DashboardPane />
 */
export class DetailsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: '',
            isSearching: false,
            search: {
                string: '',
                category: '',
            },
        };
    };

    static propTypes = {
        currentUser: PropTypes.shape(CurrentUserProps),
        tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
        activeTicket: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        labels: LabelProps,
        view: PropTypes.oneOf(Object.values(TicketViews)),
        users: PropTypes.shape(UserProps),
        onOpenMessage: PropTypes.func.isRequired,
        refreshTickets: PropTypes.func.isRequired,
        onChangeTicket: PropTypes.func.isRequired,
    };
    
    /**
     * @function filterTickets
     * @summary Filters, searches and sorts the tickets
     * 
     * @param {Array} tickets - all the tickets
     * @param {Symbol} view - the current view of the details pane
     * @param {Object} currentUser - the current user
     * @param {String} searchString - the string to search by
     * @param {String} searchCategory - the category to search by
     * @param {Boolean} isSearching - whether a search should occur
     * @param {String} sortBy - the category to sort by
     * 
     * @returns {Map} Filtered tickets
     */
    filterTickets = memoize((tickets, view, currentUser, searchString, searchCategory, isSearching, sortBy) => {
        let filtered = [];

        if (view === TicketViews.ALL) {
            filtered = tickets;
        } else if (view === TicketViews.ASSIGNED) {
            filtered = tickets.filter(ticket => ticket.assignee === currentUser.name || ticket.assignee === currentUser.role.name);
        } else if (view === TicketViews.REPORTED) {
            filtered = tickets.filter(ticket => ticket.reporter === currentUser.name || ticket.reporter === 'Anonymous' || ticket.reporter === currentUser.role.name);
        }

        if (searchString !== '' && isSearching) {
            const re = new RegExp(_.escapeRegExp(searchString), 'i');
            filtered = _.filter(filtered, ticket => re.test(ticket[searchCategory]));
        }

        if (!filtered) {
            filtered = [];
        } else {
            filtered = this.sortTickets(filtered, sortBy.length ? sortBy : 'modified');
            if (!sortBy.length || sortBy === 'modified' || sortBy === 'created') {
                filtered.reverse();
            }
        }
        const filterTickets = new Map();
        filtered.forEach(ticket => filterTickets.set(ticket.id, ticket));

        return filterTickets;
    }, _.isEqual);

    /**
     * @function changeTicket
     * @summary Changes the current ticket
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.ticketid - the new ticket id
     */
    changeTicket = (event, data) => {
        this.props.onChangeTicket(data.ticketid);
    };

    /**
     * @function onSortChange
     * @summary Updates the sort type
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new value
     */
    onSortChange = (event, data) => {
        this.setState({
            sortBy: data.value,
        });
    };

    /**
     * @function sortTickets
     * @summary Sorts the tickets by the specified category
     * 
     * @param {Array} tickets - the available tickets
     * @param {String} category - the category to sort by
     * 
     * @returns {Array} Sorted tickets
     */
    sortTickets = (tickets, category) =>
        sortOptions[category] === 'base'
            ? _.sortBy(tickets, [category])
            : _.sortBy(tickets, [ticket => getTicketKey[category](ticket[category])[sortOptions[category]]]);
    
    /**
     * @function onSearch
     * @summary An event handler to handle a new search request
     * 
     * @param {String} string - the search string
     * @param {String} category - the category to search by
     */
    onSearch = (string, category) => {
        if (string !== '' && category !== '') {
            this.setState({
                search: {
                    string,
                    category,
                },
                isSearching: true,
            });
        }
    };

    /**
     * @function clearSearch
     * @summary Clears the search state
     */
    clearSearch = () => {
        this.setState({
            search: {
                string: '',
                category: '',
            },
            isSearching: false,
        });
    };

    /**
     * @function render
     * @summary renders the component
     */
    render = () => {
        const categoryOptions = sortDDoptions();
        let { activeTicket } = this.props;
        if (typeof activeTicket === 'string') {
            activeTicket = parseInt(activeTicket, 10);
        }
        const filtered = this.filterTickets(
            this.props.tickets,
            this.props.view,
            this.props.currentUser,
            this.state.search.string,
            this.state.search.category,
            this.state.isSearching,
            this.state.sortBy
        ); // Map
        if (filtered.size) {
            if (!filtered.has(activeTicket) || activeTicket === -1) {
                activeTicket = filtered.keys().next().value;
            }
            return <Grid centered id='details'>
                <Grid.Column width={4} style={{ paddingBottom: '0' }}>
                    <Segment.Group>
                        <TicketSorter sortCategory={this.state.sortBy} categoryOptions={categoryOptions} onSortChange={this.onSortChange} />
                        <TicketList tickets={[...filtered.values()]} changeTicket={this.changeTicket} activeTicket={activeTicket} />
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column width={this.props.currentUser.role === UserTypes.USER ? 12 : 9} style={{ paddingBottom: '0' }}>
                    <Segment.Group style={{ border: 'none', WebkitBoxShadow: 'none', boxShadow: 'none' }}>
                        <Segment basic>
                            <TicketSearch isSearching={this.state.isSearching} onSearch={this.onSearch} clearSearch={this.clearSearch} />
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
    