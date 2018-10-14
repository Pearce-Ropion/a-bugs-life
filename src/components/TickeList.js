import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const TicketList = props =>
    <Segment.Group size='mini'>
        { props.tickets.map(ticket => <Segment key={`ticket-${ticket.id}`} content={ticket.summary} /> ) }
    </Segment.Group>

TicketList.propTypes = {
    tickets: PropTypes.arrayOf(PropTypes.shape({
        project: PropTypes.string,
        type: PropTypes.oneOf(Object.keys(TicketTypes)),
        summary: PropTypes.string,
        description: PropTypes.string,
        assignee: PropTypes.string,
        reporter: PropTypes.string,
        watchers: PropTypes.arrayOf(PropTypes.string),
        components: PropTypes.string,
        epic: PropTypes.id,
        priority: PropTypes.oneOf(Object.keys(PriorityLevels)),
        severity: PropTypes.oneOf(Object.keys(SeverityLevels)),
        labels: PropTypes.arrayOf(PropTypes.string),
        attachments: PropTypes.arrayOf(PropTypes.number),
        status: PropTypes.shape({
            type: PropTypes.symbol,
            value: PropTypes.string,
            color: PropTypes.string,
        }),
        dateCreated: PropTypes.number,
        dateModified: PropTypes.number,
        dateClosed: PropTypes.number,
    })),
}