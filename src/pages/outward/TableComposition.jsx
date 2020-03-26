import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag } from 'antd';

const columns = [
    {
      title: formatMessage({ id: 'outWard.label.tableassignment-order' }),
      dataIndex: 'pedido',
      render: text => <a>{text}</a>,
    },
    {
      title: formatMessage({ id: 'outWard.button.composition-outward-pallets-ass' }),
      dataIndex: 'pallets'
    },
    {
      title: formatMessage({ id: 'outWard.button.composition-outward-boxes-ass' }),
      dataIndex: 'cajas'
    }
];
const data = [
    {
        key: '1',
        pedido: 'TE1001120201',
        pallets: 3,
        cajas: 150
    },
    {
        key: '2',
        pedido: 'TE1001120202',
        pallets: 10,
        cajas: 500
    },
    {
        key: '3',
        pedido: 'TE1001120203',
        pallets: 12,
        cajas: 600
    },
    {
        key: '4',
        pedido: 'TE1001120204',
        pallets: 15,
        cajas: 900
    }
];
export default class TableComposition extends PureComponent {
    render() {
        return (
            <Table columns={columns} dataSource={data} pagination={false}/>
        );            
    }
}