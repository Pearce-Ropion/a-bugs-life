import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const items = [
    { key: 'foobar1', name: 'foobar', icon: {
        name: 'cogs',
        size: 'mini'
    } },
    { key: 'foobar2', name: 'foobar', icon: 'cogs' },
    { key: 'foobar3', name: 'foobar', icon: 'cogs' }
];

export const Sidebar = props =>
    <div id='sidebar'>
        {/* <Menu borderless icon='labeled' vertical items={items} /> */}
    </div>
    