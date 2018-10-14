import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

import { EpicTag } from '../../Tags';

export const cellFormatter = () => ({ epic }) => {
    <EpicTag epic={epic} />
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
