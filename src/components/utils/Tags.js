/**
 * @file
 * @summary Creates tag components
 */

import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { StatusTypes } from '../../api/constants/Status';

/**
 * @function TicketTag
 * @summary Creates a label tage
 * 
 * @param {Object} props - the available props
 * @property {String} props.tag - the content of the label 
 * 
 * @returns {FSC} <TicketTag />
 */
export const TicketTag = props => <Label content={props.tag} className='ticket-tag' />;

/**
 * @function EpicTag
 * @summary Creates a label tage
 * 
 * @param {Object} props - the available props
 * @property {String} props.tag - the content of the label 
 * 
 * @returns {FSC} <EpicTag />
 */
export const EpicTag = props => <Label content={props.epic} color='pruple' />;

/**
 * @function StatusTag
 * @summary Creates a label tage
 * 
 * @param {Object} props - the available props
 * @property {String} props.tag - the content of the label
 * @property {String} props.style - style to apply to the label
 * @property {String} props.name - name of the status
 * 
 * @returns {FSC} <StatusTag />
 */
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