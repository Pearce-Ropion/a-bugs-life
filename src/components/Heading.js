import React from 'react'
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { TicketModal } from './TicketModal';
import { LoginModal } from './LoginModal';

export const Heading = props =>
    <Grid id='heading' padded>
        <Grid.Column width={12}>
            <Button basic inverted content='Dashboard' />
            <Button basic inverted content='Assigned' />
            <Button basic inverted content='Reported' />
            <Button basic inverted content='Watched' />
        </Grid.Column>
        <Grid.Column width={4} className='right'>
            <TicketModal isOnMenu />
            <LoginModal />
        </Grid.Column>
    </Grid>