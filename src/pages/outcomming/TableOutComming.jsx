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
        visibleCompo: false,
        currentRecord: ""
    };
    showDrawerAssig = (item) => {
        this.setState({
          visibleAssign: true,
          currentRecord: item,
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
                      {
                            record.status=="PENDING" ?
                                <Button type="primary" onClick={()=>{this.showDrawerAssig(record)}}> 
                                    <FormattedMessage id="outComming.button.assign"/>
                                </Button>
                                : <Button disabled type="primary" onClick={()=>{this.showDrawerAssig(record)}}> 
                                <FormattedMessage id="outComming.button.assign"/>
                            </Button>}
                        <Divider type="vertical" />
                        <Button onClick={()=>{this.showDrawerCompo(record.key)}}>
                            <FormattedMessage id="outComming.button.composition"/>
                        </Button>
                        <Divider type="vertical" />
                        { record.key=="" 
                            ? <Checkbox defaultChecked={false} disabled onChange={()=>{this.props.onConfirm(record)}}>Confirm</Checkbox>
                            :   <span>
                                {
                                    record.status=="PENDING"
                                    ? <Checkbox onChange={()=>{this.props.onConfirm(record)} } > Confirm </Checkbox>
                                    : <Checkbox disabled onChange={()=>{this.props.onConfirm(record)} } > Confirmed </Checkbox>
                                }
                                    
                                </span> 
                        }      
                        <AssignmentOutComming 
                            datesProductAll = {this.props.datesProductAll}
                            visibleOne={this.state.visibleAssign}
                            currentOutcomming={this.state.currentRecord}
                            closeOne={this.onCloseDrawerAssig}
                            postOutcomming= {this.props.postOutcomming}
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