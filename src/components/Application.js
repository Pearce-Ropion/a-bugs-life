import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Heading } from './Heading';
import { Sidebar } from './Sidebar';
import { TicketModal } from './TicketModal';
// import { TicketList } from './TickeList';
import { getData } from '../api/getData';
import { TicketTable } from './Tables/TicketTable';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render = () => (
        <React.Fragment>
            <Heading />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <TicketTable tickets={getData(200)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {/* Footer */}
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
};