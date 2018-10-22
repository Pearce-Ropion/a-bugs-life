import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Heading } from './Heading';
import { Sidebar } from './Sidebar';
import { TicketModal } from './TicketModal';
import { TicketList } from './TicketList';
import { getData } from '../api/getData';
import { TicketTable } from './Tables/TicketTable';
// import { Details } from './Details';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.tickets = getData(100)
    }

    render = () => (
        <React.Fragment>
            <Heading />
            <Grid id='application'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <TicketList tickets={this.tickets} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {/* <Details ticket={this.tickets[0]} /> */}
                        {/* <TicketTable tickets={this.tickets} /> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {/* Footer */}
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
};