/**
 * @file
 * @summary Creates a Create Pane Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { TicketHandler } from '../ticket/TicketHandler';

import { LabelProps } from '../../api/Labels';
import { UserProps, CurrentUserProps } from '../../api/constants/Users';

/**
 * @export
 * @function CreatePane
 * @summary Implements the home page
 * 
 * @param {Object} props - the available props
 * @property {Object} props.labels - the available labels
 * @property {Array} props.users - the list of all users
 * @property {Object} props.currentUser - the current user
 * @property {Function} props.onOpenMessage - an event handler to open a specified message
 * @property {Function} props.refreshTickets - an event handler to refresh all tickets
 * 
 * @returns {FSC} <CreatePane />
 */
export const CreatePane = props => {
    return <Grid centered>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
            <TicketHandler
                users={props.users}
                labels={props.labels}
                currentUser={props.currentUser}
                onOpenMessage={props.onOpenMessage}
                refreshTickets={props.refreshTickets} />
        </Grid.Column>
        <Grid.Column width={3} />
    </Grid>
}
    

CreatePane.propTypes = {
    labels: LabelProps.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape(UserProps)).isRequired,
    currentUser: PropTypes.shape(CurrentUserProps).isRequired,
    onOpenMessage: PropTypes.func.isRequired,
    refreshTickets: PropTypes.func.isRequired,
};
