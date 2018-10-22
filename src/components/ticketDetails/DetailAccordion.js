import React from 'react';
import { Accordion, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const DetailAccordion = props =>
    <Accordion defaultActiveIndex={0} fluid>
        <Divider />
        <Accordion.Title content={props.title} active={props.active} />
        <Accordion.Content content={props.render} active={props.active} />
    </Accordion>

DetailAccordion.defaultProps = {
    active: true,
};

DetailAccordion.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    render: PropTypes.node,
};
