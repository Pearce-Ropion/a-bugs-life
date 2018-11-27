/**
 * @file
 * @summary Creates the Ticket Details Component
 */

import React from 'react';
import { Grid, Header, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { StatusTag, TicketTag } from '../utils/Tags';

import TicketProps from '../../api/constants/TicketProps';

/**
 * @export
 * @function TicketDetails
 * @summary Detail listing of a ticket
 * 
 * @param {Object} props - the available properties
 * @property {Object} ticket - the ticket to render
 * 
 * @returns {FSC} <TicketDetails />
 */
export const TicketDetails = props =>
    <Grid padded='horizontally'>
        <Grid.Row columns={1}>
            <Header>
                {props.ticket.summary}
                <Header.Subheader content={`Ticket #: ${props.ticket.id}`} />
            </Header>
        </Grid.Row>
        <Grid.Row columns={3}>
            <Grid.Column>
                <Header as='h4' style={{ height: '35px' }}>
                    Status
                    <StatusTag name={props.ticket.status} />
                </Header>
                <Header as='h4'>
                    Resolution
                    <Header.Subheader content={props.ticket.resolution} />
                </Header>
                <Header as='h4'>
                    Labels
                    <Header.Subheader style={{ marginTop: '0.5em'}}>
                        <Label.Group size='small'>
                            {
                                props.ticket.labels.map((label, idx) => {
                                    return <TicketTag key={`label-${idx}`} tag={label} />
                                })
                            }
                        </Label.Group>
                        
                    </Header.Subheader>
                </Header>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4'>
                    Priority
                    <Header.Subheader content={props.ticket.priority} />
                </Header>
                <Header as='h4'>
                    Severity
                    <Header.Subheader content={props.ticket.severity} />
                </Header>
                <Header as='h4'>
                    Component
                    <Header.Subheader content={props.ticket.component} />
                </Header>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4'>
                    Assignee
                    <Header.Subheader content={props.ticket.assignee} />
                </Header>
                <Header as='h4'>
                    Reporter
                    <Header.Subheader content={props.ticket.reporter} />
                </Header>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
            <Grid.Column>
                <Header as='h4'>
                    Description
                    <Header.Subheader content={props.ticket.description} />
                </Header>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4'>
                    Comments
                    <Header.Subheader content={props.ticket.comments} />
                </Header>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
            <Grid.Column>
                <Header as='h4'>
                    Created On
                    <Header.Subheader content={moment.unix(props.ticket.created).format('MMM Do, YYYY - HH:mm A')} />
                </Header>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4'>
                    Last Modified On
                    <Header.Subheader content={moment.unix(props.ticket.modified).format('MMM Do, YYYY - HH:mm A')} />
                </Header>
            </Grid.Column>
            {
                props.ticket.closed &&
                <Grid.Column>
                    <Header as='h4'>
                        Closed On
                        <Header.Subheader content={moment.unix(props.ticket.modified).format('MMM Do, YYYY - HH:mm A')} />
                    </Header>
                </Grid.Column>
            }
        </Grid.Row>
    </Grid>

TicketDetails.propTypes = {
    ticket: PropTypes.shape(TicketProps),
};