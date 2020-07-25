import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table } from 'antd';
import DrawerAssignment from './drawerAssignmentProduct';
import {isMobile} from 'react-device-detect';

export default class TableAssignment extends PureComponent {
  state ={
    visibleAssignProduct: false,
    currentItem: {}
  }

  showDrawerAssigProduct = (e) => {
    
    console.log(e)
    this.setState({
      visibleAssignProduct: true,
      currentItem: e
    });
  };

  onDrawerAssigProduct = () => {
    this.setState({
      visibleAssignProduct: false
    });
  }
    render() {
      const columns = [
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-order' }),
          dataIndex: 'pedido',
          width: isMobile ? 120 : 120,
          render: text => <a>{text}</a>,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-pallets-re' }),
          dataIndex: 'palletsto',
          width: isMobile ? 160 : 160,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-boxes-re' }),
          dataIndex: 'cajasto',
          width: isMobile ? 160 : 160,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-pallets-di' }),
          dataIndex: 'palletsde',
          width: isMobile ? 160 : 150,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-boxes-di' }),
          dataIndex: 'cajasde',
          width: isMobile ? 160 : 150,
        },
        {
            title: formatMessage({ id: 'outComming.label.tableassignment-assign' }),
            key: 'action',
            width: isMobile ? 100 : 100,
            render: (record) => (
              <span>
                  <a onClick={ () => {this.showDrawerAssigProduct(record)} }><FormattedMessage id="outComming.label.tableassignment-assign"/></a>   
                  <DrawerAssignment postOutcomming= {this.props.postOutcomming} datesProductAll = {this.props.datesProductAll} currentItem={this.state.currentItem} visible={this.state.visibleAssignProduct} onClose={this.onDrawerAssigProduct} currentOutcomming={this.props.currentOutcomming} currentShipping={record}/>     
              </span>
            )
        }
      ];
      const data = [
        {
            key: '1',
            pedido: 'SH-TE1001120201',
            palletsto: 3,
            cajasto: 150,
            palletsde: 3,
            cajasde: 150
        },
        {
            key: '2',
            pedido: 'SH-TE1001120202',
            palletsto: 10,
            cajasto: 500,
            palletsde: 2,
            cajasde: 100
        },
        {
            key: '3',
            pedido: 'SH-TE1001120203',
            palletsto: 12,
            cajasto: 600,
            palletsde: 12,
            cajasde: 600
        },
        {
            key: '4',
            pedido: 'SH-TE1001120204',
            palletsto: 15,
            cajasto: 900,
            palletsde: 15,
            cajasde: 900
        }
      ];
        return (
            <Table columns={columns} dataSource={data} scroll={isMobile ? {x: 860}: {x: 840}} pagination={false}/>
        );            
    }
}