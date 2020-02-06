import React, { PureComponent } from 'react';
import { _ } from 'lodash';

import { Table } from 'antd';

const columns = [
    {
      title: 'Pedido',
      dataIndex: 'pedido',
    },
    {
      title: 'Pallets asignados',
      dataIndex: 'pallets',
    },
    {
      title: 'Cajas asignadas',
      dataIndex: 'cajas',
    },
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

class TableComposition extends PureComponent{
    render(){
        return(
            <span>
                <Table columns={columns} dataSource={data} size="small"/>
            </span>
        );
    }
}

export default TableComposition;