/* eslint-disable react/display-name */
import React from 'react';

import { StatusTag } from '../../Tags';
import { getStatus } from '../../../api/Utils';

export const cellFormatter = () => data => {
    return <StatusTag name={data} />
}

export default ({ property, className = 'tiny centered', }) => {
    return {
        property,
        cell: {
            props: {
                className,
            },
            formatters: [cellFormatter()],
        },
    };
};
