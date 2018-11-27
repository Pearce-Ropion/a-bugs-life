/**
 * @file
 * @summary Creates a Message portal component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Portal, Message } from 'semantic-ui-react';

/**
 * @function MessagePortal
 * @summary Creates a popup overlay with a message that displays for a few seconds
 * 
 * @param {Object} props - the available props
 * @property {Boolean} isMessageOpen - whether message popup is open
 * @property {Object} message - the message details to display
 * @property {Function} onCloseMessage - an event handler to close the message pop up
 */
export const MessagePortal = props =>
    <Portal open={props.isMessageOpen}>
        <Message 
            style={{ width: '30%', position: 'fixed', top: '9%', zIndex: 1000, right: '3%' }}
            color={props.message.color}
            header={props.message.header}
            content={props.message.content} 
            onDismiss={props.onCloseMessage} />
    </Portal>;

MessagePortal.defaultProps = {
    isMessageOpen: false,
};

MessagePortal.propTypes = {
    isMessageOpen: PropTypes.bool,
    message: PropTypes.shape({
        color: PropTypes.string,
        header: PropTypes.string,
        content: PropTypes.string,
    }),
    onCloseMessage: PropTypes.func,
};