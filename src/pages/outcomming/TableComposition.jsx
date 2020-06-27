import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { formatMessage } from 'umi-plugin-react/locale';
import { Table} from 'antd';
import {isMobile} from 'react-device-detect';

const columns = [
    {
      title: formatMessage({ id: 'outComming.label.tableassignment-order' }),
      dataIndex: 'shipment',
      width: isMobile ? 120 : 120,
      render: text => <a>{text}</a>,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-pallets-ass' }),
      dataIndex: 'pallets',
      width: isMobile ? 140 : 140,
    },
    {
      title: formatMessage({ id: 'outComming.button.composition-outcomming-boxes-ass' }),
      dataIndex: 'boxes',
      width: isMobile ? 140 : 140
    }
];
const data = [
    {
        key: '1',
        shipment: 'TE1001120201',
        pallets: 3,
        boxes: 150
    },
    {
        key: '2',
        shipment: 'TE1001120202',
        pallets: 10,
        boxes: 500
    },
    {
        key: '3',
        shipment: 'TE1001120203',
        pallets: 12,
        boxes: 600
    },
    {
        key: '4',
        shipment: 'TE1001120204',
        pallets: 15,
        boxes: 900
    }
];
export default class TableComposition extends PureComponent {
    render() {
        return (
            <Table columns={columns} loading = {this.props.loading} dataSource={this.props.compositionData} pagination={false} scroll={isMobile ? {x: 720} : {x: 950}}/>
        );            
    }
}