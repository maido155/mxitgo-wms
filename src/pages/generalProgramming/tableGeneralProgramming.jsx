import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Divider,} from 'antd';

const columns = [
    {
      title: 'Semana',
      dataIndex: 'week',

    },
    {
      title: 'Tipo de producto',
      dataIndex: 'products',
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
    },
    {
        title: 'Cajas',
        dataIndex: 'box',
      },
      {
        title: 'Pallets',
        dataIndex: 'pallets',
      },
      {
        title: 'Status',
        dataIndex: 'status',
      }
  ];
  columns.push(
    {
      title: 'Acciones',
      dataIndex: 'actions',
      render: () => (
        <span>
          <Icon type="edit" theme="filled" />
          <Divider type="vertical" />
          <Icon type="close-circle" theme="filled" />
          <Divider type="vertical" />
         <Icon type="arrows-alt" />
         <Divider type="vertical" />
          <Icon type="eye" theme="filled" />
        </span>
      ),
    },
  )

  const data = [
    {
      key: '1',
      week: '10 - 12',
      products: "Gold",
      client: 'Vallejo',
      box:  "7400",
      pallets: "500",
      status: "Programado",
      actions: "iconos"
    },
    {
        key: '2',
      week: '6-12',
      products: "Premium",
      client: 'Cuautitlán',
      box:  "8200",
      pallets: "530",
      status: "220",
      actions: "iconos"
    },
    {
        key: '3',
      week: '31-5',
      products: "Gold",
      client: 'Reparto',
      box:  "7400",
      pallets: "500",
      status: "43",
      actions:""
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

class tableGeneralProgramming extends PureComponent{

    render(){
        return(
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        );
    }

}
export default tableGeneralProgramming;