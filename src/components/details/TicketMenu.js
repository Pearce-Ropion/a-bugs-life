/**
 * @file
 * @summary Creates the Ticket Menu Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';

import { TicketHandler } from '../ticket/TicketHandler';
import { AssigneeEditor } from '../editor/Assignee';
import { FieldEditor } from '../editor/FieldEditor';
import { StatusEditor } from '../editor/Status';
import { ResolutionEditor } from '../editor/Resolution';

import TicketProps from '../../api/constants/TicketProps';
import { UserProps, UserTypes, CurrentUserProps } from '../../api/constants/Users';
import { ticketFields } from '../../api/models/ticket';
import { ResolutionTypes, StatusTypes } from '../../api/constants/Status';
import { LabelProps } from '../../api/Labels';

/**
 * @export
 * @function TicketMenu
 * @summary The menu to be displayed on the right of the details with options for editing a ticket
 * 
 * @param {Object} props - the available properties
 * @property {Array} users - all the available users
 * @property {Array} ticket - the current ticket
 * @property {Object} labels - all the available labels
 * @property {Object} currentUser - the current user
 * @property {Function} onOpenMessage - an event handler to open the message portal when an action is performed
 * @property {Function} refreshTickets - an event handler to refresh the ticket list
 * 
 * @returns {FSC} <TicketMeu />
 */
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
            <Button.Group vertical fluid basic className='centerVerticalGroup'>
                <AssigneeEditor
                    type='search'
                    ticket={props.ticket}
                    original={ticketFields({
                        ...props.ticket,
                    }).assignee}
                    values={props.users}
                    onOpenMessage={props.onOpenMessage}
                    refreshTickets={props.refreshTickets} />
                <FieldEditor content='Assign to Me' field='assignee' value={props.currentUser.name} ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
            </Button.Group>
            
        </Segment>
        {
            (props.currentUser.role === UserTypes.DEVELOPER || props.currentUser.role === UserTypes.TESTER) && 
                <Segment basic>
                    <Button.Group vertical fluid basic className='centerVerticalGroup'>
                    {
                        props.currentUser.role === UserTypes.DEVELOPER &&
                        <React.Fragment>
                            <FieldEditor content='In Progress' field='status' value='In Progress' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                            <FieldEditor content='Code Complete' field='status' value='Code Complete' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                            <FieldEditor content='Code Review' field='status' value='Code Review' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                        </React.Fragment>
                    }
                    {
                        props.currentUser.role === UserTypes.TESTER &&
                        <React.Fragment>
                            <FieldEditor content='In Testing' field='status' value='Testing' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                            <FieldEditor content='Tesing Bugfix' field='status' value='QA Testing' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                        </React.Fragment>
                    }
                    </Button.Group>
                </Segment>
        }
        <Segment basic>
            <Button.Group vertical fluid basic className='centerVerticalGroup'>
                <StatusEditor
                    type='dropdown'
                    ticket={props.ticket}
                    original={ticketFields({
                        ...props.ticket,
                    }).status}
                    onOpenMessage={props.onOpenMessage}
                    refreshTickets={props.refreshTickets} />
                {props.ticket.status !== 'Closed' && <ResolutionEditor
                    type='dropdown'
                    ticket={props.ticket}
                    original={ticketFields({
                        ...props.ticket,
                    }).resolution}
                    extraUpdates={{ status: StatusTypes.CLOSED.name }}
                    onOpenMessage={props.onOpenMessage}
                    refreshTickets={props.refreshTickets} />}
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
                            <FieldEditor content='Blocked' field='status' value='Blocked' ticket={props.ticket} onOpenMessage={props.onOpenMessage} refreshTickets={props.refreshTickets} />
                        </Button.Group>
                    </Segment>
        }
    </Segment.Group>

TicketMenu.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(UserProps)),
    ticket: PropTypes.shape(TicketProps),
    labels: LabelProps,
    currentUser: PropTypes.shape(CurrentUserProps),
    onOpenMessage: PropTypes.func.isRequired,
    refreshTickets: PropTypes.func.isRequired,
};
