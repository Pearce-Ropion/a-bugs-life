import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withAxios } from 'react-axios';
import axios from 'axios';

import { ToggleEditor } from './ToggleEditor';
import { sqlNormalizeTicket } from '../../api/Utils';
import Messages from '../../api/constants/Messages';

export const EditorHandler = withAxios(class AxiosEditorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isSearchLoading: false,
            field: '',
            searchResults: [],
            error: false,
        };
    };

    static propTypes = {
        type: PropTypes.string,
        // values: the values for search source or dropdowns
        values: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.func.isRequired,
        property: PropTypes.string,
        onOpenMessage: PropTypes.func.isRequired,
        refreshTickets: PropTypes.func.isRequired,
    }

    toggleEditorModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onFieldChange = (event, data) => {
        this.setState({
            error: false, 
            field: data.value,
        });
    }

    onSearchChange = (event, data) => {
        this.setState({
            isSearchLoading: true,
            field: data.value,
        });

        setTimeout(() => {
            if (this.state.field.length < 1) {
                this.setState({
                    isSearchLoading: false,
                });
            } else {
                const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
                const isMatch = result => re.test(result.name);

                this.setState({
                    isSearchLoading: false,
                    results: _.filter(this.props.values, isMatch),
                });
            }
        }, 300);
    };

    onSearchResultSelect = (event, data) => {

    };

    validateSearch = () => {
        if (this.state.field !== '') {
            return true;
        }
        return true; // Change
    }

    onUpdate = () => {
        if (this.props.type === 'search') {
            if (validateSearch()) {
                const normalized = sqlNormalizeTicket(true, {
                    ...this.props.ticket,
                    [this.props.property.toLowerCase()]: this.state.field,
                });
                axios.post('/api/tickets/update', normalized)
                    .then(response => {
                        this.toggleEditorModal();
                        this.props.onOpenMessage(Messages.UPDATE_TICKET_SUCCESS);
                        this.props.refreshTickets();
                    })
                    .catch(err => {
                        this.props.onOpenMessage(Messages.UPDATE_TICKET_ERROR);
                    });
            } else {
                this.setState({
                    error: true,
                })
            }
        } else if (this.props.type === 'select') {
            if (validateDropdown()) {
                const normalized = sqlNormalizeTicket(true, {
                    ...this.props.ticket,
                    [this.props.property.toLowerCase()]: this.state.field,
                });
                axios.post('/api/tickets/update', normalized)
                    .then(response => {
                        this.toggleEditorModal();
                        this.props.refreshTickets();
                        this.props.onOpenMessage(Messages.UPDATE_TICKET_SUCCESS);
                    })
                    .catch(err => {
                        this.props.onOpenMessage(Messages.UPDATE_TICKET_ERROR);
                    });
            }
        }
    };

    render = () => {
        return (
            <Modal
                size='mini'
                className='editor'
                open={this.state.isOpen}
                header={`Edit ${this.props.property}`}
                trigger={<ToggleEditor title={this.props.property} toggleEditorModal={this.toggleEditorModal} />}
                content={this.props.content({...this.state, ...this.props})}
                actions={[
                    <Button key='cancel-editor-modal' content='Cancel' onClick={this.toggleEditorModal} />,
                    <Button key='update-editor-modal' content='Update' onClick={this.onUpdate} positive />,
                ]} />
        );
    }
});
