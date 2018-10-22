import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { DetailAccordion } from './ticketDetails/DetailAccordion';
import TicketProps from '../api/constants/TicketProps';

export class TicketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {
                details: true,
                description: true,
            },
        },
    };

    render = () => {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <DetailAccordion title='Details' active={this.state.active.details} render={DetailsSection} />
                </Grid.Column>
                <Grid.Column width={6}>
                    
                </Grid.Column>
            </Grid>
        );
    }

    

Details.propTypes = {
    ticket: PropTypes.shape(TicketProps),
};