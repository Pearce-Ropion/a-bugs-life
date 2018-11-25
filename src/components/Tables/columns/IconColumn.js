/* eslint-disable react/display-name */
import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { getPriority } from '../../../api/Utils';

export const cellFormatter = () => data => {
    const { name, icon} = getPriority(data);
    return (
        <Popup
            content={name}
            trigger={<Icon {...icon} />} />
    );
}

export default ({property, className='tiny centered', }) => {
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
