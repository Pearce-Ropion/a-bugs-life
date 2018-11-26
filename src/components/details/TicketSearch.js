import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Dropdown, Popup, Button, Icon } from 'semantic-ui-react';

import { sortDDoptions } from '../../api/DropdownOptions';

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

    onSearchChange = (event, data) => {
        this.setState({
            [data.name]: data.value,
            error: {
                ...this.state.error,
                [data.name]: false,
            }
        });
    };

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

    clearSearch = () => {
        if (this.state.search.length !== 0) {
            this.props.clearSearch();
            this.setState({
                search: '',
                category: '',
            });
        }
    };

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
