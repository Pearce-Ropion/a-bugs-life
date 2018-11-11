import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { TicketHandler } from '../TicketHandler';

export const CreatePane = props =>
    <Grid centered>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
            <TicketHandler onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
        </Grid.Column>
        <Grid.Column width={3} />
    </Grid>