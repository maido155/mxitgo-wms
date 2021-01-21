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
        recordKey: "",
        boxesAssign: '',
        assignedBox: '',
        dayDatedatesOutcomming: '',
        disableButtonAssign: false
    };
    showDrawerAssig = (item) => {
        console.log("assign")
        let oc = item.key;
        this.props.setVisibleAssign(true);
        this.setState({
          currentRecord: item,
          recordKey: oc,
          boxesAssign: item.boxs.split('/')[1],
          assignedBox: item.assignedBox,
          dayDatedatesOutcomming: item.dayDate
        });
        
        this.props.getOutcommingByEntry(oc,this.props.productKey);
    };
    showDrawerCompo = (id, item) => {
        let oc = item.key;
        this.setState({
          currentRecord: item,
          recordKey: oc,
          boxesAssign: item.boxs.split('/')[1],
          assignedBox: item.assignedBox,
          dayDatedatesOutcomming: item.dayDate
        });
        if(item.status === 'CONFIRMED'){
            this.setState({
                disableButtonAssign: true
            })
        }else{
            this.setState({
                disableButtonAssign: false
            })
        }
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
                        
                        pallets={this.props.pallets}
                        box={this.props.box}
                        currentValuePallet={this.props.currentValuePallet}
                        currentValueBox={this.props.currentValueBox}
                        isFirstTime={this.props.isFirstTime}
                        shipment={this.props.shipment}

                        dataOutcommingsByEntry={this.props.dataOutcommingsByEntry}
                        boxesRequired={this.state.boxesAssign}
                        assignedBox={this.state.assignedBox}
                        dayDatedatesOutcomming={this.state.dayDatedatesOutcomming}
                        datesOutcomming={datesOutcomming}

                        visibleBuy={this.props.visibleBuy}
                        setVisibleBuy={this.props.setVisibleBuy}
                        onCloseVisibleBuy={this.props.onCloseVisibleBuy}
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
                   
                    pallets={this.props.pallets}
                    box={this.props.box}
                    currentValuePallet={this.props.currentValuePallet}
                    currentValueBox={this.props.currentValueBox}
                    isFirstTime={this.props.isFirstTime}
                    shipment={this.props.shipment}

                    dataOutcommingsByEntry={this.props.dataOutcommingsByEntry}
                    getOutcommingByEntry={this.props.getOutcommingByEntry}

                    boxesRequired={this.state.boxesAssign}
                    assignedBox={this.state.assignedBox}
                    dayDatedatesOutcomming={this.state.dayDatedatesOutcomming}
                    datesOutcomming={datesOutcomming}

                    setCurrentShipping={this.props.setCurrentShipping}
                    disableButtonAssign={this.state.disableButtonAssign}
                    
                    visibleBuy={this.props.visibleBuy}
                    setVisibleBuy={this.props.setVisibleBuy}
                    onCloseVisibleBuy={this.props.onCloseVisibleBuy}
                />
                <Table rowKey="uid" loading = {this.props.loading} columns={columns} dataSource={datesOutcomming} pagination={false} scroll={isMobile ? { x: 1000} : {x: 990}} size="small"/>
            </div>
        );            
    }
}