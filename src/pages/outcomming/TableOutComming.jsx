import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';

export default class TableOutComming extends PureComponent {
    render() {
        const { datesTableOutcomming } = this.props;
        console.log("TableOutComming");
        console.log(datesTableOutcomming);

        const columns = [
            {
                title: '',
                dataIndex: 'date',
                key:'date',
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
                width: isMobile ? 100 : 130,
                render: (text, record) => (
                    <span>
                      {record.status === "PENDING"
                        ? <FormattedMessage id="outComming.label.table-outComming.status.pending" />
                        :  record.status === "CONFIRMED"
                            ?<FormattedMessage id="outComming.label.table-outComming.status.confirmed" />
                            : <FormattedMessage id="outComming.label.table-outComming.status.no-status" />
                      } 
                    </span>
                )
            },
            {
                title: '',
                width: isMobile ? 400 : 360,
                render: (record) => (
                  <span>
                      {
                            record.status=="PENDING" && record.pallets!="0/0" && record.boxs!="0/0"  ?
                                <Button type="primary" onClick={()=>{this.props.showDrawerAssig(record)}}> 
                                    <FormattedMessage id="outComming.button.assign"/>
                                </Button>
                                : <Button disabled type="primary" onClick={()=>{this.props.showDrawerAssig(record)}}> 
                                <FormattedMessage id="outComming.button.assign"/>
                            </Button>}
                        <Divider type="vertical" />
                        { record.key=="" 
                            ?<Button disabled onClick={()=>{this.props.showDrawerCompo(record.key, record)}}>
                                <FormattedMessage id="outComming.button.composition"/>
                             </Button>
                            :<Button onClick={()=>{this.props.showDrawerCompo(record.key, record)}}>
                                <FormattedMessage id="outComming.button.composition"/>
                             </Button>                                       
                        }    
                        <Divider type="vertical" />
                        { record.key=="" 
                            ? <Checkbox defaultChecked={false} disabled onChange={()=>{this.props.onConfirm(record)}}><FormattedMessage id='outComming.table.confirm'/></Checkbox>
                            :   <span>
                                {
                                    record.status=="PENDING"
                                    ? <Checkbox onChange={()=>{this.props.onConfirm(record)} } > <FormattedMessage id='outComming.table.confirm'/> </Checkbox>
                                    : <Checkbox disabled onChange={()=>{this.props.onConfirm(record)} } > <FormattedMessage id='outComming.table.confirmed'/></Checkbox>
                                }
                                    
                                </span> 
                        }
                  </span>
                ),
            }
        ];
                   
        return (
            <div>
                <Table rowKey="uid" loading = {this.props.loading} columns={columns} dataSource={datesTableOutcomming} pagination={false} scroll={isMobile ? { x: 1000} : {x: 990}} size="small"/>
            </div>
        );            
    }
}