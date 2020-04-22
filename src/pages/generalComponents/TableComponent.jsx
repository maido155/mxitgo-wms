import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';
import DeleteComponent from './ModalDeleteComponent';
import { Table, Divider, Icon } from 'antd';
import { _ } from 'lodash';

class TableComponent extends PureComponent {
  render(){
    const columns = [
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.center' }),
          dataIndex: 'center',
          key:'center',
          width: isMobile ? 170 : 200,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.premium' }),
          dataIndex: 'premium',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.gold' }),
          dataIndex: 'gold',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.second' }),
          dataIndex: 'segunda',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.hand' }),
          dataIndex: 'mano',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.finger' }),
          dataIndex: 'dedo',
          width: isMobile ? 90 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.tablecomponent.label.actions' }),
        key: 'action',
        fixed: 'right',
        width: isMobile ? 80 : 155,
        render: () => (
          <span>
            <a onClick={this.props.showNewLine}>
              { isMobile
                ?<Icon type="edit" />
                : <span><Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/></span>
              }
            </a>
            <Divider type="vertical" />
              <DeleteComponent/>
          </span>
        ),
      }
    ];

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} scroll={isMobile ? {x: 700} :{x: 1000}} size="small"/>
    );
  }
}

export default TableComponent;