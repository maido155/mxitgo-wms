import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table, Divider, Icon } from 'antd';
import ModalDeleteComponent from './ModalDeleteComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';

export default class TableComponent extends PureComponent{
    render(){
      const columns = [
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.center' }),
            dataIndex: 'center',
            width: 200
        },
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.premium' }),
            dataIndex: 'premium',
            width: 100
        },
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.gold' }),
            dataIndex: 'gold',
            width: 100
        },
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.second' }),
            dataIndex: 'segunda',
            width: 100
        },
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.hand' }),
            dataIndex: 'mano',
            width: 100
        },
        {
            title: formatMessage({ id: 'shipping.tablecomponent.label.finger' }),
            dataIndex: 'dedo',
            width: 100
        },
      ];

      if(isMobile){
        columns.push(
          {
            title: formatMessage({ id: 'shipping.tablecomponent.label.actions' }),
            key: 'action',
            fixed: 'right',
            width: 150,
            render: () => (
              
              <span>
                <a onClick={this.props.showDrawer}>
                  <Icon type="edit" />
                </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
              </span>
            ),
          }
        );
      }else{
        columns.push(
          {
            title: formatMessage({ id: 'shipping.tablecomponent.label.actions' }),
            key: 'action',
            fixed: 'right',
            width: 155,
            render: () => (
              
              <span>
                <a onClick={this.props.showDrawer}>
                  <Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/>
                </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
              </span>
            ),
          }
        );
      }

      const data = [
        {
            key: '1',
            center: 'Chiapas - La Escondida',
            premium: 1200,
            gold: 39,
            segunda: 39,
            mano: 39,
            dedo: 39,
        },
        {
            key: '2',
            center: 'Chiapas - El Ejidal',
            premium: 300,
            gold: 220,
            segunda: 220,
            mano: 220,
            dedo: 220,
        },
        {
            key: '3',
            center: 'Tabasco - El Muelle',
            premium: 24,
            gold: 43,
            segunda: 43,
            mano: 43,
            dedo: 43,
        }
      ];
      
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', 
          name: record.name,
        }),
      };
        return(
            <Table 
              rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} 
              scroll={{x: 1000, y: 300}} size="small"
            />
        );
    }
}