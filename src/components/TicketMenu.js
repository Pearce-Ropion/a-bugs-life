import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';

import { TicketHandler } from './TicketHandler';
import TicketProps from '../api/constants/TicketProps';
import { AssigneeEditor } from './editor/Assignee';
import { UserProps, UserTypes } from '../api/constants/Users';
import { ticketFields } from '../api/models/ticket';
import { FieldEditor } from './editor/FieldEditor';
import { StatusEditor } from './editor/Status';
import { ResolutionEditor } from './editor/Resolution';
import { ResolutionTypes, StatusTypes } from '../api/constants/Status';

export const TicketMenu = props =>
    <Segment.Group id='ticket-menu'>
        <Segment basic>
            <TicketHandler isModal isEditable
                currentUser={props.currentUser}
                users={props.users}
                ticket={props.ticket}
                labels={props.labels}
                onOpenMessage={props.onOpenMessage}
                refreshTickets={props.refreshTickets} />
        </Segment>
        <Segment basic>
            <AssigneeEditor
                type='search'
                ticket={props.ticket}
                original={ticketFields({
                    ...props.ticket,
                }).assignee}
                values={props.users}
                onOpenMessage={props.onOpenMessage}
                refreshTickets={props.refreshTickets} />
        </Segment>
        <Segment basic>
            <Button.Group vertical fluid basic className='centerVerticalGroup'>
                { props.currentUser.role === UserTypes.DEVELOPER && <FieldEditor content='In Progress' field='status' value='In Progress' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} /> }
                { props.currentUser.role === UserTypes.TESTER && <FieldEditor content='In Testing' field='status' value='Testing' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} /> }
                <StatusEditor
                    type='dropdown'
                    ticket={props.ticket}
                    original={ticketFields({
                        ...props.ticket,
                    }).status}
                    onOpenMessage={props.onOpenMessage}
                    refreshTickets={props.refreshTickets} />
                { !props.ticket.closed && <ResolutionEditor
                    type='dropdown'
                    ticket={props.ticket}
                    original={ticketFields({
                        ...props.ticket,
                    }).resolution}
                    extraUpdates={{ status: StatusTypes.CLOSED.name }}
                    onOpenMessage={props.onOpenMessage}
                    refreshTickets={props.refreshTickets} /> }
            </Button.Group>
        </Segment>
        {
            props.currentUser.role === UserTypes.TESTER &&
                (props.ticket.status !== 'Closed' || props.ticket.status !== 'Resolved') &&
                    <Segment basic>
                        <Button.Group vertical fluid basic className='centerVerticalGroup'>
                            <FieldEditor
                                content='Valid Bug'
                                field='status'
                                value='Validated'
                                ticket={props.ticket}
                                onOpenMessage={props.onOpenMessage}
                                refreshTickets={props.refreshTickets} />
                            <FieldEditor
                                content='Not a Bug'
                                field='status'
                                value='Closed'
                                extraUpdates={{ resolution: ResolutionTypes.NOT_A_BUG }}
                                ticket={props.ticket}
                                onOpenMessage={props.onOpenMessage}
                                refreshTickets={props.refreshTickets} />
                        </Button.Group>
                    </Segment>
        }
        {
            props.currentUser.role === UserTypes.DEVELOPER &&
                (props.ticket.status !== 'Closed' || props.ticket.status !== 'Resolved') &&
                    <Segment basic>
                        <Button.Group vertical fluid basic className='centerVerticalGroup'>
                            <FieldEditor
                                content='Bug Fixed'
                                field='status'
                                value='Test Ready'
                                ticket={props.ticket}
                                onOpenMessage={props.onOpenMessage}
                                refreshTickets={props.refreshTickets} />
                        </Button.Group>
                    </Segment>
        }
    </Segment.Group>

TicketMenu.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(UserProps)),
    ticket: PropTypes.shape(TicketProps),
    labels: PropTypes.arrayOf(PropTypes.string),
    currentUser: PropTypes.shape(UserProps),
    onOpenMessage: PropTypes.func.isRequired,
    refreshTickets: PropTypes.func.isRequired,
};
