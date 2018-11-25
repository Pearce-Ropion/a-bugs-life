import React from 'react';
import PropTypes from 'prop-types';
import { Table, AutoSizer, Column, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { Popup, Icon, Container, Label } from 'semantic-ui-react';

import { getPriority } from '../../api/Utils';
import { StatusTag } from '../Tags';

import 'react-virtualized/styles.css';

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

    onOpenTicket = event => {
        const id = event.target.getAttribute('ticket');
        this.props.onOpenTicket(id);
    }

    baseCell = (content, cache, cellProps) => {
        const { columnIndex, rowIndex, cellData, key, dataKey } = cellProps;
        const styles = {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
        };

        if (dataKey === 'status') {
            styles['justify-content'] = 'flex-end';
        } else if (dataKey === 'id') {
            styles['justify-content'] = 'center';
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

    iconRender = cache => cellProps => {
        const priorityName = cellProps.cellData;
        const priority = getPriority(priorityName);
        const content = <Popup
            content={priority.name}
            trigger={<Icon {...priority.icon} style={{ marginTop: '-7px' }} />} />;
        return this.baseCell(content, cache, cellProps);
    };

    linkRender = cache => cellProps => {
        const id = cellProps.cellData;
        const content = <a style={{ textDecoration: 'underline', cursor: 'pointer' }} ticket={id} onClick={this.onOpenTicket}>{id}</a>
        return this.baseCell(content, cache, cellProps);
    }

    textRender = cache => cellProps => {
        const content = <Container content={cellProps.cellData} />
        return this.baseCell(content, cache, cellProps);
    };

    statusRender = cache => cellProps => {
        const status = cellProps.cellData;
        const content = <StatusTag name={status} />
        return this.baseCell(content, cache, cellProps);
    };

    render = () => {
        const cache = this.cache;
        // console.log(this.props.tickets);
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
