import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutComming from './AssignmentOutComming';
import CompositionOutComming from './CompositionOutComming';
import {isMobile} from 'react-device-detect';
import { connect } from 'dva';



@connect(({ outcomming, programming, loading }) => ({
    outcomming,
    programming,
    loading: loading.models.outcomming,
    datesOutcomming:outcomming.datesOutcomming,
    shippingsByEntry:outcomming.shippingsByEntry,
    datesProductAll: programming.datesProductAll,
    datesCustomerAll: programming.datesCustomerAll,
    dataOutcommingsByEntry: outcomming.dataOutcommingsByEntry
}))
export default class TableOutComming extends PureComponent {
    state = { 
        currentRecord: "",
        recordKey: ""
    };
    showDrawerAssig = (item) => {
        console.log("assign")
        let oc = item.key;
        this.props.setVisibleAssign(true);
        this.setState({
          currentRecord: item,
          recordKey: oc,
        });
        
        this.props.dispatch({
            type: 'outcomming/getOutcommingsByEntry',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken'),
                 idOutcomming : oc,
                 productKey : this.props.productKey
                }
             },
        });


    };
    showDrawerCompo = (id) => {
        this.props.onShowCompositionData(id);

        this.props.setVisibleCompo(true);
    };
    onCloseDrawerAssig = () => {
        this.props.setVisibleAssign(false);
    };
    onCloseDrawerCompo = () => {
        this.props.setVisibleCompo(true);
    };
    render() {
        let {dataOutcommingsByEntry} = this.props.outcomming;
        const { datesOutcomming } = this.props;
        console.log("TableOutComming");
        console.log(dataOutcommingsByEntry);

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
                            productDesc = {this.props.productDesc}
                            datesProductAll = {this.props.datesProductAll}
                            visibleOne={this.props.visibleAssign}
                            currentOutcomming={this.state.currentRecord}
                            closeOne={this.onCloseDrawerAssig}
                            postOutcomming= {this.props.postOutcomming}
                            restartOutcomming= {this.props.restartOutcomming}
                            recordKey= {this.state.recordKey}
                            visibleAssignProduct={this.props.visibleAssignProduct} 
                            setVisibleAssignProduct={this.props.setVisibleAssignProduct}
                            dataOutcommingsByEntry={dataOutcommingsByEntry}
                        />
                        <CompositionOutComming
                            loading = {this.props.loading}
                            compositionData = {this.props.compositionData}
                            visibleTwo={this.props.visibleCompo}
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