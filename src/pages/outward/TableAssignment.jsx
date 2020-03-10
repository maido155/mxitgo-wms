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
      title: formatMessage({ id: 'outWard.label.tableassignment-pallets-re' }),
      dataIndex: 'palletsto'
    },
    {
      title: formatMessage({ id: 'outWard.label.tableassignment-boxes-re' }),
      dataIndex: 'cajasto'
    },
    {
      title: formatMessage({ id: 'outWard.label.tableassignment-pallets-di' }),
      dataIndex: 'palletsde'
    },
    {
      title: formatMessage({ id: 'outWard.label.tableassignment-boxes-di' }),
      dataIndex: 'cajasde'
    },
    {
        title: formatMessage({ id: 'outWard.label.tableassignment-assign' }),
        key: 'action',
        render: () => (
          <span>
              <a><FormattedMessage id="outWard.label.tableassignment-assign"/></a>     
          </span>
        )
    }
];
const data = [
    {
        key: '1',
        pedido: 'TE1001120201',
        palletsto: 3,
        cajasto: 150,
        palletsde: 3,
        cajasde: 150
    },
    {
        key: '2',
        pedido: 'TE1001120202',
        palletsto: 10,
        cajasto: 500,
        palletsde: 2,
        cajasde: 100
    },
    {
        key: '3',
        pedido: 'TE1001120203',
        palletsto: 12,
        cajasto: 600,
        palletsde: 12,
        cajasde: 600
    },
    {
        key: '4',
        pedido: 'TE1001120204',
        palletsto: 15,
        cajasto: 900,
        palletsde: 15,
        cajasde: 900
    }
];
export default class TableAssignment extends PureComponent {
    render() {
        return (
            <Table columns={columns} dataSource={data} pagination={false}/>
        );            
    }
}