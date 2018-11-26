import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { StatusTypes } from '../../api/constants/Status';

export const TicketTag = props => <Label content={props.tag} className='ticket-tag' />;

export const EpicTag = props => <Label content={props.epic} color='pruple' />;

export const StatusTag = props => {
    const status = StatusTypes[props.name.toUpperCase().replace(' ', '_')];
    return <Label content={status.name} className={`status-${status.color}`} style={props.style} />;
}

TicketTag.propTypes = {
    tag: PropTypes.string,
};

EpicTag.propTypes = {
    epic: PropTypes.string,
};

StatusTag.defaultProps = {
    style: {},
}

StatusTag.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
}