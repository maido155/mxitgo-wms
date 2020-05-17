import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon } from 'antd';

const columns = [
  {
    title: 'Semana',
    dataIndex: 'Week',
    key: 'Week',
    width: isMobile ? 100 :100
  },
  {
    title: 'Tipo de producto',
    dataIndex: 'Product',
    key: 'Product',
    width: isMobile ? 130 :100
  },
  {
    title: 'Cliente',
    dataIndex: 'Client',
    key: 'Client',
    width: isMobile ? 90 :100
  },
  {
      title: 'Cajas',
      dataIndex: 'Box',
      key: 'Box',
      width: isMobile ? 90 :100
    },
    {
      title: 'Pallets',
      dataIndex: 'Pallets',
      key: 'Pallets',
      width: isMobile ? 90 :100
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: isMobile ? 100 :100
    }
];

  if(isMobile){
    columns.push(
      {
        title: 'Acciones',
        key: 'action',
        fixed: 'right',
        width: 120,
       
        render: () => (
          <span>
           <Icon type="edit" theme="filled" />
            <Divider type="vertical" />
            <Icon type="close-circle" theme="filled" />
            <Divider type="vertical" />
            <Icon type="arrows-alt" />
            <Divider type="vertical" />
            <Icon type="eye" theme="filled"  />
          </span>
        ),
      }
    );
  }else{
    columns.push(
      {
        title: 'Acciones',
        key: 'action',
        fixed: 'right',
        width: 350,
        render: () => (
          <span>
            <a><Icon type="edit" theme="filled" /></a>
            <a> Editar</a>
            <Divider type="vertical" />
            <a><Icon type="close-circle" theme="filled" /></a>
            <a> Cancelar</a>
            <Divider type="vertical" />
            <a><Icon type="arrows-alt" /></a>
            <a> Pendiente</a>
            <Divider type="vertical" />
            <a><Icon type="eye" theme="filled"  /></a>
            <a> Visualizar</a>
          </span>
        ),
      }
    );
  }

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
}; 

class TableGeneralProgramming extends PureComponent{
    render(){
      const { datesPrograming } = this.props;
        return(
            <Table  style={{marginTop: "2%"}} size="small" rowSelection={rowSelection} columns={columns} dataSource={datesPrograming} scroll={isMobile ? {x: 720} : {x: 950}}  />
        );
    }
}

export default TableGeneralProgramming;