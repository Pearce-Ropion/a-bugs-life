/**
 * @file
 * @summary Implements the Editor Handler Class
 */

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


/**
 * @export
 * @callback
 * @class EditorHandler
 * @summary Implements editing of single fields within a modal
 * 
 * @param {Object} props - the available props
 * @property {String} props.type - the type of the editor
 * @property {String} props.original - the the original value of the editor
 * @property {Object} props.ticket - the current ticket being updated
 * @property {Array} props.values - the values to place in the dropdown
 * @property {Function} props.content - the component to render
 * @property {String} props.property - the property to call the editor
 * @property {Function} props.onOpenMessage - an event handler to open a specified message
 * @property {Function} props.refreshTickets - an event handler to refresh the list of all tickets
 * @property {Object} props.extraUpdates - other updates to apply to the ticket
 * 
 * @returns {React.Component} <EditorHandler />
 */
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
        values: PropTypes.array,
        content: PropTypes.func.isRequired,
        property: PropTypes.string.isRequired,
        onOpenMessage: PropTypes.func.isRequired,
        refreshTickets: PropTypes.func.isRequired,
        extraUpdates: PropTypes.shape(TicketProps),
    }

    /**
     * @function toggleEditorModal
     * @summary Toggles the visiblity of the editor modal and resets the value of the field
     */
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

    /**
     * @function onFieldChange
     * @summary Updates the current field with new values
     * 
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new value
     */
    onFieldChange = (event, data) => {
        this.setState({
            error: false, 
            field: data.value,
        });
    }

    /**
     * @function onSearchChange
     * @summary Updates the search field with new search results
     *
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.value - the new value
     */
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

                /**
                 * @function isMatch
                 * @param {Object} result - the object to search
                 */
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

    /**
     * @function onSearchSelect
     * @summary Sets the new value of the search field
     * 
     * @param {Event} event - React's Synthetic Event
     * @param {Object} data - the available props
     * @property {String} data.result.title - the new value
     */
    onSearchSelect = (event, data) => {
        this.onFieldChange(event, {
            value: data.result.title,
        });
    };

    /**
     * @function validate
     * @summary validates the field in the editor
     */
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

    /**
     * @function onUpdate
     * @summary updates the field in the database
     */
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

    /**
     * @constant handlers
     * @memberof EditorHandler
     * @summary Easy way to reference the functions
     */
    handlers = {
        toggleEditorModal: this.toggleEditorModal,
        onFieldChange: this.onFieldChange,
        onSearchChange: this.onSearchChange,
        onSearchSelect: this.onSearchSelect,
    }

    /**
     * @function render
     * @summary Renders the component
     */
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
