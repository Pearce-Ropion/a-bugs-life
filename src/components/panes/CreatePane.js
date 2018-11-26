import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { TicketHandler } from '../ticket/TicketHandler';

import { LabelProps } from '../../api/Labels';
import { UserProps, CurrentUserProps } from '../../api/constants/Users';

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
