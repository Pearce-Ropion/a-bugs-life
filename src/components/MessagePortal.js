import React from 'react';
import PropTypes from 'prop-types';
import { Portal, Message } from 'semantic-ui-react';

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