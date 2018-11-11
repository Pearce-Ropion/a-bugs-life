import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';

import { TicketHandler } from './TicketHandler';
import TicketProps from '../api/constants/TicketProps';
import { AssigneeEditor } from './editor/Assignee';

export const TicketMenu = props =>
    <Segment.Group>
        <Segment basic>
            <TicketHandler isModal isEditable ticket={props.ticket} labels={props.labels} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
        </Segment>
        <Segment basic>
            <AssigneeEditor type='search' ticket={props.ticket} users={props.users} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
        </Segment>
        <Segment basic>
            <Button.Group vertical fluid basic className='centerVerticalGroup'>
                <Button content='In Progress' />
                <Button content='Change Status' />
                <Button content='Close Ticket' />
            </Button.Group>
        </Segment>
    </Segment.Group>

TicketMenu.propTypes = {
    ticket: PropTypes.shape(TicketProps),
    labels: PropTypes.arrayOf(PropTypes.string),
    onOpenMessage: PropTypes.func.isRequired,
    refreshTickets: PropTypes.func.isRequired,
};
