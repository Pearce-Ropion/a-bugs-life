import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { StatusTag } from '../Tags';
import { capitalize } from '../api/Utils';

export const ListItemTitle = props =>
    <List.Item>
        <List.Description content={`${capitalize(props.property)}:`} />
    </List.Item>

export const ListItemValue = props =>
    <List.Item>
        <List.Title content={capitalize(props.property)} />
    </List.Item>

export const ListItemLabel = props =>
    <List.Item>
        <List.Title content={<StatusTag name={props.property.name} color={props.property.color} />} />
    </List.Item>