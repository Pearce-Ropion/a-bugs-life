import React from 'react';
import { Segment, List, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import TicketProps from '../api/constants/TicketProps';
import { StatusTag } from './Tags'

export const PriorityPopup = props =>
    <Popup
        content={props.name}
        trigger={<List.Icon {...props.icon} size='large' vertically='middle' />} />

export const TicketList = props =>
    <Segment style={{ borderRadius: 0, overflowY: 'scroll', height: 'calc(100vh - 64px)' }}>
        <List divided relaxed='very'>
            {
                props.tickets.map(ticket =>
                    <List.Item key={`ticket-${ticket.id}`}>
                        <PriorityPopup {...ticket.priority} />
                        <List.Content>
                            <List.Header content={ticket.summary} />
                            <List.Description content={<StatusTag name={ticket.status.value} color={ticket.status.color} />} />
                        </List.Content>
                    </List.Item>
                )
            }
        </List>
    </Segment>

TicketList.propTypes = {
    tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
}