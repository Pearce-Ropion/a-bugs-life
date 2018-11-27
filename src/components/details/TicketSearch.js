/**
 * @file
 * @summary Creates the Ticket Search Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Dropdown, Popup, Button, Icon } from 'semantic-ui-react';

import { sortDDoptions } from '../../api/DropdownOptions';

/**
 * @export
 * @class TicketSearch
 * @summary Implements searching of tickets and a search bar at the top of the details page
 * 
 * @param {Object} props - the available props
 * @property {Function} props.onSearch - an even handler to start a search action
 * @property {Function} props.clearSearch - an event handler to clear the search bar and update the ticket list
 * 
 * @returns {React.Component} <TicketSearch />
 */
export class TicketSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            category: '',
            error: {
                search: false,
                category: false,
            },
        };
    };

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        clearSearch: PropTypes.func.isRequired,
    };

    /**
     * @function onSearchChange
     * @summary Handles a change of the searhc input or category
     * 
     * @param {Event} - React's Syntehtic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the current value of the component
     * @property {Boolean} data.error - the error state of the component
     */
    onSearchChange = (event, data) => {
        this.setState({
            [data.name]: data.value,
            error: {
                ...this.state.error,
                [data.name]: false,
            }
        });
    };

    /**
     * @function onSearch
     * @summary Called when a search is performed. Does data validation and passes actual searching to parent component
     */
    onSearch = () => {
        const { search, category } = this.state;
        if (search.length !== 0 && category.length !== 0) {
            this.props.onSearch(this.state.search, this.state.category);
        } else {
            if (search.length === 0) {
                this.setState({
                    error: {
                        ...this.state.error,
                        search: true,
                    },
                });
            }
            if (category.length === 0) {
                this.setState({
                    error: {
                        ...this.state.error,
                        category: true,
                    },
                });
            }
            if (search.length === 0 && category.length === 0) {
                this.setState({
                    error: {
                        search: true,
                        category: true,
                    },
                });
            }
        }
    };

    /**
     * @function clearSearch
     * @summary Clears the state of the search bar and passes a clear command to the parent component
     */
    clearSearch = () => {
        if (this.state.search.length !== 0) {
            this.props.clearSearch();
            this.setState({
                search: '',
                category: '',
            });
        }
    };

    /**
     * @function render
     * @summary Renders the component
     */
    render = () => {
        const categoryOptions = sortDDoptions();
        return (
            <Container>
                <Input fluid
                    value={this.state.search}
                    placeholder='Search...'
                    name='search'
                    error={this.state.error.search}
                    onChange={this.onSearchChange}
                    iconPosition='left'
                    icon={<Popup
                        content='Clear Search'
                        position='bottom left'
                        trigger={<Icon name='close' link onClick={this.clearSearch} />} />}
                    action={
                        <React.Fragment>
                            <Dropdown compact selection button clearable
                                name='category'
                                placeholder='category'
                                content='Category'
                                error={this.state.error.category}
                                value={this.state.category}
                                options={categoryOptions.slice(0, 4).concat(categoryOptions.slice(6, 8))}
                                onChange={this.onSearchChange} />
                            <Button content='Search' icon='search' labelPosition='right' color='teal' onClick={this.onSearch} />
                        </React.Fragment>
                    } />
            </Container>
        );
    }
};
