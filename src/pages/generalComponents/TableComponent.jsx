import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon, Modal } from 'antd';
import { _ } from 'lodash';
import { connect } from 'dva';

const { confirm } = Modal;

@connect(({ shipping, loading }) => ({
  shipping,
  loading: loading.models.shipping,

}))

class TableComponent extends PureComponent {
  
  showDeleteConfirm = (payload) => {
    let _self = this;
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _self.props.dispatch({
          type: 'shipping/removeWarehouse',
          payload: {
              payload: {
               Authorization: sessionStorage.getItem('idToken'),
               payload
              }
           },
        });
      },
      onCancel() {
      },
    });
  }
  render(){
    const { warehouse, masterMode } = this.props;
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
          key:'premium',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.gold' }),
          dataIndex: 'gold',
          key:'gold',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.second' }),
          dataIndex: 'second',
          key:'second',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.hand' }),
          dataIndex: 'hand',
          key:'hand',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.finger' }),
          dataIndex: 'finger',
          key:'finger',
          width: isMobile ? 90 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.tablecomponent.label.actions' }),
        key: 'action',
        fixed: 'right',
        width: isMobile ? 80 : 155,
        render: (record) => (
          <span>
            <a onClick={()=>{masterMode == "CONF" ? this.props.showNewLineConfirm("CONF" , record, "CONF") : this.props.showNewLine("EDIT" , record, "NEW||EDIT")}}>
              { isMobile
                ?<Icon type="edit" />
                : <span><Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/></span>
              }
            </a>
            <Divider type="vertical" />
            <a onClick={()=>{this.showDeleteConfirm(record)}} type="dashed">
              { isMobile
                ?<Icon type="delete"/>
                : <span><Icon type="delete"/><FormattedMessage id="shipping.label.table-shipping.delete"/></span>
              }
            </a>
          </span>
        ),
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={warehouse} pagination={false} scroll={isMobile ? {x: 700} :{x: 1000}} size="small"/>
    );
  }
}

export default TableComponent;