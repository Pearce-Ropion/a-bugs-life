/**
 * @file
 * @summary Implements the Dashboard Handler Class
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Label } from 'semantic-ui-react';
import { ResponsivePie } from '@nivo/pie'
import _ from 'lodash';

import { TicketTable } from '../table/TicketTable';

import TicketProps from '../../api/constants/TicketProps';
import { capitalize } from '../../api/Utils';

/**
 * @export
 * @class DashboardPane
 * @summary Implements the dashboard handler and renderer
 * 
 * @param {Object} props - the available props
 * @property {Array} props.tickets - all the tickets
 * 
 * @returns {React.Component} <DashboardPane />
 */
export class DashboardPane extends React.Component {
    constructor(props) {
        super(props);
        this.statusCategories = {
            open: ['Open', 'Reopened', 'Backlog', 'Blocked'],
            testing: ['Validated', 'Test Ready', 'Testing', 'QA Testing'],
            development: ['In Progress', 'Code Complete', 'Code Review'],
            closed: ['Resolved', 'Closed'],
        };
        this.state = {

        };
    };

    static propTypes = {
        tickets: PropTypes.arrayOf(PropTypes.shape(TicketProps)),
    };

    /** 
     * @function splitTickets
     * @summary Splits the tickets by their defined type
     * 
     * @param {String} type - the preperty to split the tickets by
     * 
     * @returns {Array} Subarray of tickets
     */
    splitTickets = type =>
        this.statusCategories.hasOwnProperty(type)
            ? _.filter(this.props.tickets, ({ status }) => this.statusCategories[type].includes(status))
            : [];
    
    /**
     * @function categorizeTickets
     * @summary Specified the pie segments to be rendered
     * 
     * @returns {Array} Pie segment object
     */
    categorizeTickets = () => {
        const types = {
            open: { count: 0, color: 'hsl(210, 100%, 45%)'},
            testing: { count: 0, color: 'hsl(36, 100%, 50%)'},
            development: { count: 0, color: 'hsl(60, 100%, 45%)'},
            closed: { count: 0, color: 'hsl(120, 60%, 50%)'},
        };
        this.props.tickets.forEach(ticket => {
            Object.keys(types).forEach(type => {
                if (this.statusCategories[type].includes(ticket.status)) {
                    types[type].count++;
                }
            });
        });
        return Object.entries(types).map(([key, value]) => {
            return {
                id: key,
                label: capitalize(key),
                value: value.count,
                color: value.color,
            };
        });
    };

    /**
     * @function render
     * @summary renders the component
     */
    render = () => {
        const open = this.splitTickets('open');
        const testing = this.splitTickets('testing');
        const development = this.splitTickets('development');
        const closed = this.splitTickets('closed');

        return (
            <Grid centered id='dashboard' padded>
                <Grid.Column width={8}>
                    <Segment style={{ height: '55vh', width: '100%'}}>
                        <Label attached='top' content='Overall Status' />
                        <ResponsivePie
                            data={this.categorizeTickets()}
                            margin={{
                                top: 10,
                                left: 30,
                                bottom: 30,
                            }}
                            innerRadius={0.4}
                            padAngle={1}
                            cornerRadius={3}
                            colors='spectral'
                            colorBy={type => type.color}
                            borderWidth={1}
                            borderColor='inherit:darker(0.2)'
                            radialLabelsLinkColor='inherit'
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15} />
                    </Segment>
                    {
                        !!open.length && <Segment>
                            <Label attached='top' content='Open Tickets' />
                            <TicketTable tickets={open} onOpenTicket={this.props.onOpenTicket} />
                        </Segment>
                    }
                </Grid.Column>
                <Grid.Column width={8}>
                    {
                        !!testing.length && <Segment>
                            <Label attached='top' content='Tickets Getting Tested' />
                            <TicketTable tickets={testing} onOpenTicket={this.props.onOpenTicket} />
                        </Segment>
                    }
                    {
                        !!development.length && <Segment>
                            <Label attached='top' content='Tickets In Development' />
                            <TicketTable tickets={development} onOpenTicket={this.props.onOpenTicket} />
                        </Segment>
                    }
                    {
                        !!closed.length && <Segment>
                            <Label attached='top' content='Closed Tickets' />
                            <TicketTable tickets={closed} onOpenTicket={this.props.onOpenTicket} />
                        </Segment>
                    }
                </Grid.Column>
            </Grid>
        );
    }
};