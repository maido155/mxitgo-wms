import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { formatMessage } from 'umi-plugin-react/locale';
import { Table} from 'antd';
import {isMobile} from 'react-device-detect';

const columns = [
    {
      title: formatMessage({ id: 'outComming.label.tableassignment-order' }),
      dataIndex: 'shipment',
      width: isMobile ? 50 : 100,
      render: text => <a>{text}</a>,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-pallets-ass' }),
      dataIndex: 'pallets',
      width: isMobile ? 50 : 100,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-boxes-ass' }),
      dataIndex: 'boxes',
      width: isMobile ? 50 : 100
    }
];
export default class TableComposition extends PureComponent {
    render() {
        return (
            <Table columns={columns} loading = {this.props.loading} dataSource={this.props.compositionData} pagination={false} scroll={isMobile ? {x: 400} : {x: 800}}/>
        );            
    }
}