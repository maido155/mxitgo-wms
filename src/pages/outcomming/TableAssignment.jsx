import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table } from 'antd';
import DrawerAssignment from './drawerAssignmentProduct';
import {isMobile} from 'react-device-detect';

export default class TableAssignment extends PureComponent {
  state ={
    currentItem: {}
  }

  showDrawerAssigProduct = (e) => { 
    console.log(e)
    this.props.setVisibleAssignProduct(true);
    this.setState({
      currentItem: e
    });
  };

  onDrawerAssigProduct = () => {
    this.props.setVisibleAssignProduct(false);
  }
    render() {
      let {dataOutcommingsByEntry} = this.props;
      console.log("TableAssignment");
      console.log(dataOutcommingsByEntry);
      const columns = [
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-order' }),
          dataIndex: 'shipment',
          width: isMobile ? 120 : 120,
          render: text => <a>{text}</a>,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-pallets-re' }),
          dataIndex: 'received_pallets',
          width: isMobile ? 160 : 160,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-boxes-re' }),
          dataIndex: 'received_boxes',
          width: isMobile ? 160 : 160,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-pallets-di' }),
          dataIndex: 'availables_pallets',
          width: isMobile ? 160 : 150,
        },
        {
          title: formatMessage({ id: 'outComming.label.tableassignment-boxes-di' }),
          dataIndex: 'availables_boxes',
          width: isMobile ? 160 : 150,
        },
        {
            title: formatMessage({ id: 'outComming.label.tableassignment-assign' }),
            key: 'action',
            width: isMobile ? 100 : 100,
            render: (record) => (
              <span>
                  <a onClick={ () => {this.showDrawerAssigProduct(record)} }><FormattedMessage id="outComming.label.tableassignment-assign"/></a>   
                  <DrawerAssignment postOutcomming= {this.props.postOutcomming} datesProductAll = {this.props.datesProductAll} currentItem={this.state.currentItem} visible={this.props.visibleAssignProduct} onClose={this.onDrawerAssigProduct} currentOutcomming={this.props.currentOutcomming} currentShipping={record}/>     
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
            palletsde: 150,
            cajasde: 6
        },
        {
            key: '2',
            pedido: 'SH-TE1001120202',
            palletsto: 10,
            cajasto: 500,
            palletsde: 100,
            cajasde: 2
        },
        {
            key: '3',
            pedido: 'SH-TE1001120203',
            palletsto: 12,
            cajasto: 600,
            palletsde: 600,
            cajasde: 12
        },
        {
            key: '4',
            pedido: 'SH-TE1001120204',
            palletsto: 15,
            cajasto: 900,
            palletsde: 900,
            cajasde: 15
        }
      ];
        return (
            <Table columns={columns} dataSource={dataOutcommingsByEntry} scroll={isMobile ? {x: 860}: {x: 840}} pagination={false}/>
        );            
    }
}