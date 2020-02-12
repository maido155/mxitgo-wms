import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table, Divider, Icon } from 'antd';
import ModalDeleteComponent from './ModalDeleteComponent';
import {isMobile} from 'react-device-detect';

export default class TableComponent extends PureComponent{
    render(){
      const columns = [
        {
            title: 'Centro',
            dataIndex: 'center',
            width: 200
        },
        {
            title: 'Premium',
            dataIndex: 'premium',
            width: 100
        },
        {
            title: 'Gold',
            dataIndex: 'gold',
            width: 100
        },
        {
            title: 'Segunda',
            dataIndex: 'segunda',
            width: 100
        },
        {
            title: 'Mano',
            dataIndex: 'mano',
            width: 100
        },
        {
            title: 'Dedo',
            dataIndex: 'dedo',
            width: 100
        },
      ];

      if(isMobile){
        columns.push(
          {
            title: 'Acciones',
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
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            width: 155,
            render: () => (
              
              <span>
                <a onClick={this.props.showDrawer}>
                  <Icon type="edit" /> Editar
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