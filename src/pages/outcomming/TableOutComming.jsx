import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutComming from './AssignmentOutComming';
import CompositionOutComming from './CompositionOutComming';
import {isMobile} from 'react-device-detect';

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
        
        this.props.getOutcommingByEntry(oc,this.props.productKey);
    };
    showDrawerCompo = (id, item) => {
        let oc = item.key;
        this.setState({
          currentRecord: item,
          recordKey: oc,
        });
        this.props.onShowCompositionData(id);
        this.props.setVisibleCompo(true);
    };
    onCloseDrawerAssig = () => {
        this.props.setVisibleAssign(false);
    };
    onCloseDrawerCompo = () => {
        this.props.setVisibleCompo(false);
    };
    render() {
        let {dataOutcommingsByEntry} = this.props;
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
                            record.status=="PENDING" && record.pallets!="0/0" && record.boxs!="0/0"  ?
                                <Button type="primary" onClick={()=>{this.showDrawerAssig(record)}}> 
                                    <FormattedMessage id="outComming.button.assign"/>
                                </Button>
                                : <Button disabled type="primary" onClick={()=>{this.showDrawerAssig(record)}}> 
                                <FormattedMessage id="outComming.button.assign"/>
                            </Button>}
                        <Divider type="vertical" />
                        { record.key=="" 
                            ?<Button disabled onClick={()=>{this.showDrawerCompo(record.key, record)}}>
                                <FormattedMessage id="outComming.button.composition"/>
                             </Button>
                            :<Button onClick={()=>{this.showDrawerCompo(record.key, record)}}>
                                <FormattedMessage id="outComming.button.composition"/>
                             </Button>                                       
                        }    
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
                  </span>
                ),
            }
        ];
                   
        return (
            <div>
                <AssignmentOutComming 
                        loading = {this.props.loading}
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
                        setCurrentShipping={this.props.setCurrentShipping}
                        currentShipping={this.props.currentShipping} 
                        dataOutcommingsByEntry={this.props.dataOutcommingsByEntry}
                />
                <CompositionOutComming
                    loading = {this.props.loading}
                    compositionData = {this.props.compositionData}
                    visibleTwo={this.props.visibleCompo}
                    closeTwo={this.onCloseDrawerCompo}
                    //Properties for drawer Assign
                    productKey = {this.props.productKey}
                    productDesc = {this.props.productDesc}
                    datesProductAll = {this.props.datesProductAll}
                    currentOutcomming={this.state.currentRecord}
                    postOutcomming= {this.props.postOutcomming}
                    restartOutcomming= {this.props.restartOutcomming}
                    recordKey= {this.state.recordKey}
                    visibleAssignProduct={this.props.visibleAssignProduct} 
                    setVisibleAssignProduct={this.props.setVisibleAssignProduct}
                    setCurrentShipping={this.props.setCurrentShipping}
                    currentShipping={this.props.currentShipping} 
                    dataOutcommingsByEntry={this.props.dataOutcommingsByEntry}
                    getOutcommingByEntry={this.props.getOutcommingByEntry}
                />
                <Table loading = {this.props.loading} columns={columns} dataSource={datesOutcomming} pagination={false} scroll={isMobile ? { x: 1000} : {x: 990}} size="small"/>
            </div>
        );            
    }
}