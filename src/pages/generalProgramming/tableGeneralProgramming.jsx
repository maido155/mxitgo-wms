import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon } from 'antd';
import { FormattedMessage} from 'umi-plugin-react/locale';

const columns = [
  {
    title: <FormattedMessage id="general.table.week"/>,
    dataIndex: 'week',
    width: isMobile ? 100 :100
  },
  {
    title: <FormattedMessage id="general.table.products"/>,
    dataIndex: 'products',
    width: isMobile ? 130 :100
  },
  {
    title: <FormattedMessage id="general.table.client"/>,
    dataIndex: 'client',
    width: isMobile ? 90 :100
  },
  {
      title: <FormattedMessage id="general.table.boxes"/>,
      dataIndex: 'box',
      width: isMobile ? 90 :100
    },
    {
      title: <FormattedMessage id="general.table.pallets"/>,
      dataIndex: 'pallets',
      width: isMobile ? 90 :100
    },
    {
      title: <FormattedMessage id="general.table.status"/>,
      dataIndex: 'status',
      width: isMobile ? 100 :100
    }
];

const data = [
  {
    key: '1',
    week: '10 - 12',
    products: "Gold",
    client: 'Vallejo',
    box:  "7400",
    pallets: "500",
    status: "Programado",
   
  },
];

  if(isMobile){
    columns.push(
      {
        title: <FormattedMessage id="general.table.actions-mobil"/>,
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
        title: <FormattedMessage id="general.table.actions"/>,
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
        return(
            <Table  style={{marginTop: "2%"}} size="small" rowSelection={rowSelection} columns={columns} dataSource={data} scroll={isMobile ? {x: 720} : {x: 950}}  />
        );
    }
}

export default TableGeneralProgramming;