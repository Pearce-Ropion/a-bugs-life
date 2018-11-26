import React from 'react';
import { Segment, List, Popup, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { StatusTag } from '../utils/Tags';

import TicketProps from '../../api/constants/TicketProps';
import { getPriority } from '../../api/Utils';

export const PriorityPopup = props => {
    const priority = getPriority(props.priority)
    return <Popup
        content={priority.name}
        trigger={<List.Icon {...priority.icon} size='large' vertically='middle' />} />
}

export const TicketList = props =>
    <Segment style={{ borderRadius: 0, overflowY: 'scroll', height: 'calc(100vh - 69px - 68px)' }}>
        <List divided relaxed='very'>
            {
                props.tickets.map(ticket =>
                    <List.Item key={`ticket-${ticket.id}`}>
                        <PriorityPopup priority={ticket.priority} />
                        <List.Content>
                            <Grid>
                                <Grid.Column width={13}>
                                    <List.Header content={ticket.summary} />
                                    <List.Description content={<StatusTag name={ticket.status} style={{ marginTop: '0.5em' }} />} />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button circular
                                        floated='right' 
                                        icon='angle right' 
                                        ticketid={ticket.id}
                                        primary={props.activeTicket === ticket.id}
                                        onClick={props.changeTicket} />
                                </Grid.Column>
                            </Grid>
                        </List.Content>
                    </List.Item>
                )
            }
        </List>
    </Segment>

TicketList.propTypes = {
    activeTicket: PropTypes.number.isRequired,
    tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)).isRequired,
    changeTicket: PropTypes.func.isRequired
};