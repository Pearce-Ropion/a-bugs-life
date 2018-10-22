import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const TicketTag = props => <Label content={props.tag} color='blue' />;

export const EpicTag = props => <Label content={props.epic} color='pruple' />;

export const StatusTag = props => <Label content={props.name} className={`status-${props.color}`} />;

TicketTag.propTypes = {
    tag: PropTypes.string,
};

EpicTag.propTypes = {
    epic: PropTypes.string,
};

StatusTag.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
}