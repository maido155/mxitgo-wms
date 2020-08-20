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
                  { record.availables_pallets==0&&record.availables_boxes==0
                    ?<a disabled onClick={ () => {this.showDrawerAssigProduct(record)} }><FormattedMessage id="outComming.label.tableassignment-assign"/></a>
                    :<a onClick={ () => {this.showDrawerAssigProduct(record)} }><FormattedMessage id="outComming.label.tableassignment-assign"/></a>
                  }  
              </span>
            )
        }
      ];
        return (
          <div>
            <DrawerAssignment 
                          postOutcomming= {this.props.postOutcomming} 
                          datesProductAll = {this.props.datesProductAll} 
                          visible={this.props.visibleAssignProduct} 
                          onClose={this.onDrawerAssigProduct} 
                          currentOutcomming={this.props.currentOutcomming} 
                          currentShipping={this.state.currentItem}/>  
            <Table 
                loading = {this.props.loading} 
                columns={columns} 
                dataSource={dataOutcommingsByEntry} 
                scroll={isMobile ? {x: 860}: {x: 840}} 
                pagination={false}/>
          </div>
        );            
    }
}