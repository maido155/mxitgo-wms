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
    const { warehouse, masterMode, oShippingItem } = this.props;
    const columns = [
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.center' }),
          dataIndex: 'center',
          key:'center',
          width: isMobile ? 170 : 200,
      },
      {
        title: formatMessage({ id: 'shipping.tablecomponent.label.premium' }),
        dataIndex: 'PRODUCT-2',
        key:'PRODUCT-2',
        width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.gold' }),
          dataIndex: 'PRODUCT-1',
          key:'PRODUCT-1',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.second' }),
          dataIndex: 'PRODUCT-3',
          key:'PRODUCT-3',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.hand' }),
          dataIndex: 'PRODUCT-5',
          key:'PRODUCT-5',
          width: isMobile ? 90 : 100,
      },
      {
          title: formatMessage({ id: 'shipping.tablecomponent.label.finger' }),
          dataIndex: 'PRODUCT-4',
          key:'PRODUCT-4',
          width: isMobile ? 90 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.tablecomponent.label.actions' }),
        key: 'action',
        fixed: 'right',
        width: isMobile ? 80 : 155,
        render: (record) => (
          <span>
            { masterMode == undefined 
              ?
                <span>
                  <a onClick={()=>{masterMode == "CONF" ? this.props.showNewLineConfirm("CONF" , record, "CONF") : this.props.showNewLine("EDIT" , record, "NEW||EDIT")}}>
                    { isMobile
                      ? <Icon type="edit"/>
                      : <span><Icon type="edit"/> <FormattedMessage id="shipping.label.table-shipping.edit"/></span>
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
              :
                <span>
                  <a onClick={()=>{masterMode == "CONF" ? this.props.showNewLineConfirm("CONF" , record, "CONF") : this.props.showNewLine("EDIT" , record, "NEW||EDIT")}}>
                    { isMobile
                      ? oShippingItem == undefined 
                        ? <Icon type="edit"/>
                        : oShippingItem.Operator == undefined
                          ? <Icon type="edit"/>
                          : oShippingItem.Operator == ""
                            ? <Icon type="edit"/>
                            : <Icon type="eye"/>
                      :oShippingItem == undefined 
                        ? <span><Icon type="edit"/> <FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                        : oShippingItem.Operator == undefined
                          ? <span><Icon type="edit"/> <FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                          : oShippingItem.Operator == ""
                            ? <span><Icon type="edit"/> <FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                            : <span><Icon type="eye"/> <FormattedMessage id="shipping.label.table-shipping.show"/></span>
                    }
                  </a>
                  { oShippingItem == undefined || oShippingItem.Operator == undefined || oShippingItem.Operator == "" &&
                    <span>
                      <Divider type="vertical"/>
                        <a onClick={()=>{this.showDeleteConfirm(record)}} type="dashed">
                          { isMobile
                            ?<Icon type="delete"/>
                            : <span><Icon type="delete"/><FormattedMessage id="shipping.label.table-shipping.delete"/></span>
                          }
                        </a>
                    </span>
                  }
                </span>
            }
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