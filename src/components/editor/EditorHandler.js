import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withAxios } from 'react-axios';
import axios from 'axios';

import { ToggleEditor } from './ToggleEditor';
import { sqlNormalizeTicket } from '../../api/Utils';
import Messages from '../../api/constants/Messages';
import TicketProps from '../../api/constants/TicketProps';

export const EditorHandler = withAxios(class AxiosEditorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isSearchLoading: false,
            field: this.props.original,
            searchResults: [],
            error: false,
        };
    };

    static defaultProps = {
        values: [],
        extraUpdates: {},
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
        original: PropTypes.string.isRequired,
        ticket: PropTypes.shape(TicketProps).isRequired,
        values: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.func.isRequired,
        property: PropTypes.string.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
        refreshTickets: PropTypes.func.isRequired,
        extraUpdates: PropTypes.shape(TicketProps),
    }

    toggleEditorModal = () => {
        const re = new RegExp(_.escapeRegExp(this.props.original), 'i');
        const isMatch = result => re.test(result.title);
        this.setState({
            isOpen: !this.state.isOpen,
            field: this.props.original,
            searchResults: _.filter(this.props.values.map(value => {
                return {
                    title: value.name,
                };
            }), isMatch),
            isSearchLoading: false,
            error: false,
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
                const re = new RegExp(_.escapeRegExp(data.value), 'i');
                const isMatch = result => re.test(result.title);

                this.setState({
                    isSearchLoading: false,
                    searchResults: _.filter(this.props.values.map(value => {
                        return {
                            title: value.name,
                        };
                    }), isMatch),
                });
            }
        }, 300);
    };

    onSearchSelect = (event, data) => {
        this.onFieldChange(event, {
            value: data.result.title,
        });
    };

    validate = () => {
        if (this.state.field === '') {
            if (this.props.type === 'search') {
                this.setState({
                    error: true,
                });
                return false;
            } else if (this.props.type === 'dropdown') {
                return true; // Change
            }
            return true; // Change
        }
        return true; // Change
    }

    onUpdate = () => {
        if (this.validate()) {
            const normalized = sqlNormalizeTicket(true, {
                ...this.props.ticket,
                [this.props.property.toLowerCase()]: this.state.field,
                ...this.props.extraUpdates,
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
    };

    handlers = {
        toggleEditorModal: this.toggleEditorModal,
        onFieldChange: this.onFieldChange,
        onSearchChange: this.onSearchChange,
        onSearchSelect: this.onSearchSelect,
    }

    render = () => {
        return (
            <Modal
                size='mini'
                className='editor'
                open={this.state.isOpen}
                header={`Edit ${this.props.property}`}
                trigger={<ToggleEditor title={this.props.button} toggleEditorModal={this.toggleEditorModal} />}
                content={this.props.content({...this.state, ...this.props, ...this.handlers})}
                actions={[
                    <Button key='cancel-editor-modal' content='Cancel' onClick={this.toggleEditorModal} />,
                    <Button key='update-editor-modal' content='Update' onClick={this.onUpdate} positive />,
                ]} />
        );
    }
});
