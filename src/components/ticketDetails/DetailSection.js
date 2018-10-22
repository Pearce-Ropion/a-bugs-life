import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { ListItemTitle, ListItemValue } from './DetailListItem';

export const DetailSection = props =>
    <Grid>
        <Grid.Column>
            <ListItemTitle property='type' />
            <ListItemTitle property='priority' />
            <ListItemTitle property='severity' />
            <ListItemTitle property='components' />
            <ListItemTitle property='labels' />
            <ListItemTitle property='epic' />
        </Grid.Column>
        <Grid.Column>
            <ListItemValue property={props.ticket.type.name} />
            <ListItemValue property={props.ticket.priority.name} />
            <ListItemValue property={props.ticket.severity} />
            <ListItemValue property='components' />
            <ListItemValue property='labels' />
            <ListItemValue property='epic' />
        </Grid.Column>
        <Grid.Column>
            <ListItemTitle property='status' />
            <ListItemTitle property='Resolution' />
            <ListItemTitle property='epic' />
        </Grid.Column>
        <Grid.Column>
            <ListItemLabel property='status' />
            <ListItemValue property='Resolution' />
            <ListItemValue property='epic' />
        </Grid.Column>
    </Grid>