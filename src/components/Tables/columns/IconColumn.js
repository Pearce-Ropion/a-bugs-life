import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export const cellFormatter = () => ({name, icon}) => {
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
