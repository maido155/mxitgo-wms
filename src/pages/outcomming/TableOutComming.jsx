import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutComming from './AssignmentOutComming';
import CompositionOutComming from './CompositionOutComming';
import {isMobile} from 'react-device-detect';

export default class TableOutComming extends PureComponent {
    state = { 
        visibleAssign: false,
        visibleCompo: false
    };
    showDrawerAssig = () => {
        this.setState({
          visibleAssign: true,
        });
    };
    showDrawerCompo = (id) => {

        this.props.onShowCompositionData(id);

        this.setState({
          visibleCompo: true,
        });
    };
    onCloseDrawerAssig = () => {
        this.setState({
          visibleAssign: false,
        });
    };
    onCloseDrawerCompo = () => {
        this.setState({
          visibleCompo: false,
        });
    };
    render() {
        const { datesOutcomming } = this.props;

        const columns = [
            {
                title: '',
                dataIndex: 'date',
                width: isMobile ? 100 : 130
            },
            {
                title: formatMessage({ id: 'outComming.label.table-pallets' }),
                dataIndex: 'pallets',
                width: isMobile ? 200 : 190
            },
            {
                title: formatMessage({ id: 'outComming.label.table-boxes' }),
                dataIndex: 'boxs',
                width: isMobile ? 200 : 180
            },
            {
                title: formatMessage({ id: 'outComming.label.table-status' }),
                dataIndex: 'status',
                width: isMobile ? 100 : 130
            },
            {
                title: '',
                key: 'action',
                width: isMobile ? 400 : 360,
                render: (record) => (
                  <span>
                        <Button type="primary" onClick={this.showDrawerAssig}> 
                            <FormattedMessage id="outComming.button.assign"/>
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{this.showDrawerCompo(record.key)}}>
                            <FormattedMessage id="outComming.button.composition"/>
                        </Button>
                        <Divider type="vertical" />
                        <Checkbox onChange={()=>{this.props.onConfirm(record.key)}}>
                            
                            <FormattedMessage id="outComming.button.confirm"/>
                        </Checkbox>      
                        <AssignmentOutComming 
                            visibleOne={this.state.visibleAssign}
                            closeOne={this.onCloseDrawerAssig}
                        />
                        <CompositionOutComming
                            loading = {this.props.loading}
                            compositionData = {this.props.compositionData}
                            visibleTwo={this.state.visibleCompo}
                            closeTwo={this.onCloseDrawerCompo}
                        />
                  </span>
                ),
            }
        ];
                   
        return (
            <Table loading = {this.props.loading} columns={columns} dataSource={datesOutcomming} pagination={false} scroll={isMobile ? { x: 1000} : {x: 990}} size="small"/>
        );            
    }
}