import React from 'react';
import PropTypes from 'prop-types';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';

import IconColumn from './columns/IconColumn';
import TextColumn from './columns/TextColumn';
import LabelColumn from './columns/LabelColumn';

export class TicketTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableBody = null;
    };

    componentDidMount = () => {
        this.forceUpdate();
    }

    getColumns = () => [
        IconColumn({ property: 'priority' }),
        TextColumn({ property: 'id', className: 'small' }),
        TextColumn({ property: 'summary', className: 'x-large' }),
    ]

    onSelect = (event, data) => {
        this.props.onSelectTicket(event, data.id);
    }

    render = () => {
        return (
            <Table.Provider
                className='ticket-table list-view'
                columns={this.getColumns()}
                renderers={{
                    body: {
                        wrapper: Virtualized.BodyWrapper,
                        row: Virtualized.BodyRow,
                    },
                }}>

                <Virtualized.Body
                    rows={this.props.tickets}
                    rowKey={({rowData, rowIdx}) => `ticket-${rowData.id}`}
                    height={400}
                    style={{
                        minWidth: '700px',
                    }}
                    ref={tableBody => {
                        this.tableBody = tableBody && tableBody.getRef();
                    }}/>

            </Table.Provider>
        );
    }
}