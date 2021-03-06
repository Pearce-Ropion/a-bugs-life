/**
 * @file
 * @summary Implements the Ticket Table Class
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, AutoSizer, Column, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { Popup, Icon, Container } from 'semantic-ui-react';

import { StatusTag } from '../utils/Tags';

import { getPriority } from '../../api/Utils';

import 'react-virtualized/styles.css';

/**
 * @export
 * @class TicketTable
 * @summary Implements the ticket table and renderer
 * 
 * @param {Object} props - the available props
 * @property {Object} props.tickets - all the tickets
 * 
 * @returns {React.Component} <TicketTable />
 */
export class TicketTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.cache = new CellMeasurerCache({
            fixedHeight: true,
            keyMapper: () => 1,
            minHeight: 20,
        });
    };

    static defaultProps = {
        tickets: [],
    };

    static propTypes = {
        tickets: PropTypes.array,
    };

    /**
     * @function onOpenTicket
     * @summary Sends an action to open the specified ticket in the ticket details pane
     */
    onOpenTicket = event => {
        const id = event.target.getAttribute('ticket');
        this.props.onOpenTicket(id);
    }

    /**
     * @function baseCell
     * @summary Creates a base cell component to auto measure the contents of the cell
     * 
     * @param {Function} content - a function to call to render the contents of the cell
     * @param {CellMeasurerCache} cache - the cache of the table
     * @param {Object} cellProps - the available props
     * 
     * @returns {FSC} <CellMeasurer />
     */
    baseCell = (content, cache, cellProps) => {
        const { columnIndex, rowIndex, cellData, key, dataKey } = cellProps;
        const styles = {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
        };

        if (dataKey === 'status') {
            styles['justifyContent'] = 'flex-end';
        } else if (dataKey === 'id') {
            styles['justifyContent'] = 'center';
        }
        
        return <CellMeasurer
            cache={cache}
            key={key}
            columnIndex={columnIndex}
            parent={parent}
            rowIndex={rowIndex}>

            <div style={styles}>
                {content ? content : String(cellData)}
            </div>
        </CellMeasurer>;
    };

    /**
     * @function iconRender
     * @summary Creates an icon with a pop up
     * 
     * @param {CellMeasurerCache} cache - the table cache
     * @param {Object} cellProps - the available props
     * 
     * @returns {Function} Instance of baseCell
     */
    iconRender = cache => cellProps => {
        const priorityName = cellProps.cellData;
        const priority = getPriority(priorityName);
        const content = <Popup
            content={priority.name}
            trigger={<Icon {...priority.icon} style={{ marginTop: '-7px' }} />} />;
        return this.baseCell(content, cache, cellProps);
    };

    /**
     * @function linkRender
     * @summary Creates an anchor tag
     * 
     * @param {CellMeasurerCache} cache - the table cache
     * @param {Object} cellProps - the available props
     * 
     * @returns {Function} Instance of baseCell
     */
    linkRender = cache => cellProps => {
        const id = cellProps.cellData;
        const content = <a style={{ textDecoration: 'underline', cursor: 'pointer' }} ticket={id} onClick={this.onOpenTicket}>{id}</a>
        return this.baseCell(content, cache, cellProps);
    }

    /**
     * @function textRender
     * @summary Creates a container with text
     * 
     * @param {CellMeasurerCache} cache - the table cache
     * @param {Object} cellProps - the available props
     * 
     * @returns {Function} Instance of baseCell
     */
    textRender = cache => cellProps => {
        const content = <Container content={cellProps.cellData} />
        return this.baseCell(content, cache, cellProps);
    };

    /**
     * @function statusRender
     * @summary Creates a status tag
     * 
     * @param {CellMeasurerCache} cache - the table cache
     * @param {Object} cellProps - the available props
     * 
     * @returns {Function} Instance of baseCell
     */
    statusRender = cache => cellProps => {
        const status = cellProps.cellData;
        const content = <StatusTag name={status} />
        return this.baseCell(content, cache, cellProps);
    };

    /**
     * @function renders
     * @summary Renders the component
     */
    render = () => {
        const cache = this.cache;
        return (
            <div style={{ flex: '1 1 auto' }}>
                <AutoSizer disableHeight>
                    {({ width }) => {
                        return <Table
                            className='ticket-table'
                            ref={this.tableRef}
                            height={200}
                            width={width}
                            headerHeight={0}
                            disableHeader={true}
                            overscanRowCount={10}
                            rowCount={this.props.tickets.length}
                            rowGetter={({ index }) => this.props.tickets[index]}
                            rowHeight={cache.rowHeight}
                            deferredMeasurementCache={cache}>
                            
                            <Column
                                id='priority'
                                width={50}
                                dataKey='priority'
                                disableSort
                                cellRenderer={this.iconRender(cache)} />
                            <Column
                                id='id'
                                width={80}
                                dataKey='id'
                                disableSort
                                cellRenderer={this.linkRender(cache)} />
                            <Column
                                id='summary'
                                width={850}
                                dataKey='summary'
                                disableSort
                                cellRenderer={this.textRender(cache)} />
                            <Column
                                id='status'
                                width={250}
                                dataKey='status'
                                disableSort
                                cellRenderer={this.statusRender(cache)} />

                        </Table>
                    }}
                </AutoSizer>
            </div>
        );
    };
};
