import React from 'react';
import { Grid, Header, Label, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TicketModal } from './TicketModal';
import TicketProps from '../api/constants/TicketProps';
import { StatusTag, TicketTag } from './Tags';
import { TicketHandler } from './TicketHandler';
import { UserTypes } from '../api/constants/Users';

export class TicketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {
                details: true,
                description: true,
            },
        };
    }

    render = () => {
        return (
            <Grid padded='vertically'>
                <Grid.Column width={this.props.currentUser === UserTypes.USER ? 15 : 12}>
                    <Grid>
                        <Grid.Row columns={1}>
                            <Header content={this.props.ticket.summary} />
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Header as='h4' style={{ height: '35px' }}>
                                    Status
                                    <StatusTag name={this.props.ticket.status} />
                                </Header>
                                <Header as='h4'>
                                    Resolution
                                    <Header.Subheader content={this.props.ticket.resolution} />
                                </Header>
                                <Header as='h4'>
                                    Labels
                                    <Header.Subheader style={{ marginTop: '0.5em'}}>
                                        <Label.Group size='small'>
                                            {
                                                this.props.ticket.labels.map((label, idx) => {
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
                                    <Header.Subheader content={this.props.ticket.priority} />
                                </Header>
                                <Header as='h4'>
                                    Severity
                                    <Header.Subheader content={this.props.ticket.severity} />
                                </Header>
                                <Header as='h4'>
                                    Component
                                    <Header.Subheader content={this.props.ticket.component} />
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h4'>
                                    Assignee
                                    <Header.Subheader content={this.props.ticket.assignee} />
                                </Header>
                                <Header as='h4'>
                                    Reporter
                                    <Header.Subheader content={this.props.ticket.reporter} />
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Header as='h4'>
                                    Description
                                    <Header.Subheader content={this.props.ticket.description} />
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Header as='h4'>
                                    Created On
                                    <Header.Subheader content={moment.unix(this.props.ticket.created).format('MMM Do, YYYY - HH:mm A')} />
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h4'>
                                    Last Modified On
                                    <Header.Subheader content={moment.unix(this.props.ticket.modified).format('MMM Do, YYYY - HH:mm A')} />
                                </Header>
                            </Grid.Column>
                            {
                                this.props.ticket.closed &&
                                <Grid.Column>
                                    <Header as='h4'>
                                        Closed On
                                        <Header.Subheader content={moment.unix(this.props.ticket.modified).format('MMM Do, YYYY - HH:mm A')} />
                                    </Header>
                                </Grid.Column>
                            }
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                {
                    this.props.currentUser !== UserTypes.USER
                        ? <Grid.Column width={4}>
                            <Segment.Group>
                                <Segment basic>
                                    <TicketHandler isModal isEditable ticket={this.props.ticket} labels={this.props.labels} onReload={this.props.onReload} />
                                </Segment>
                                <Segment basic>
                                    <Button basic fluid content='Assign' />
                                </Segment>
                                <Segment basic>
                                    <Button.Group vertical fluid basic className='centerVerticalGroup'>
                                        <Button content='In Progress' />
                                        <Button content='Change Status' />
                                        <Button content='Close Ticket' />
                                    </Button.Group>
                                </Segment>
                                <Segment basic>
                                    <Button basic fluid content='Watch' />
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                        : null
                }
            </Grid>
        );
    }
}

    

TicketDetails.propTypes = {
    ticket: PropTypes.shape(TicketProps),
};