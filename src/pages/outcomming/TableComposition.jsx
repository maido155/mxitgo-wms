import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { formatMessage } from 'umi-plugin-react/locale';
import { Table} from 'antd';
import {isMobile} from 'react-device-detect';

const columns = [
    {
      title: formatMessage({ id: 'outComming.label.tableassignment-order' }),
      dataIndex: 'pedido',
      width: isMobile ? 120 : 120,
      render: text => <a>{text}</a>,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-pallets-ass' }),
      dataIndex: 'pallets',
      width: isMobile ? 140 : 140,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-boxes-ass' }),
      dataIndex: 'cajas',
      width: isMobile ? 140 : 140
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
            <Table columns={columns} dataSource={data} pagination={false} scroll={isMobile ? {x: 400} : {x: 400}}/>
        );            
    }
}