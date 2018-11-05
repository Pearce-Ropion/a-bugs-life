import React from 'react';
import PropTypes from 'prop-types';
import { Portal, Segment, Message } from 'semantic-ui-react';

export const MessagePortal = props =>
    <Portal open={props.isMessageOpen}>
        <Segment raised style={{ position: 'fixed', top: '15%', zIndex: 1000, right: '15%' }}>
          <Segment basic>
            <Message color={props.color} header={props.header} content={props.content} onDismiss={props.onCloseMessage} />
          </Segment>  
        </Segment>
    </Portal>;

MessagePortal.defaultProps = {
    isMessageOpen: false,
};

MessagePortal.propTypes = {
    isMessageOpen: PropTypes.bool,
    color: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    onCloseMessage: PropTypes.func,
};