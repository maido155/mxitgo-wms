import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutWard from './AssignmentOutWard';
import CompositionOutWard from './CompositionOutWard';
import {isMobile} from 'react-device-detect';

export default class TableOutWard extends PureComponent {
    state = { 
        visibleAssign: false,
        visibleCompo: false
    };
    showDrawerAssig = () => {
        this.setState({
          visibleAssign: true,
        });
    };
    showDrawerCompo = () => {
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
        const columns = [
            {
                title: '',
                dataIndex: 'date',
                width: isMobile ? 100 : 130
            },
            {
                title: formatMessage({ id: 'outWard.label.table-pallets' }),
                dataIndex: 'pallets',
                width: isMobile ? 200 : 190
            },
            {
                title: formatMessage({ id: 'outWard.label.table-boxes' }),
                dataIndex: 'cajas',
                width: isMobile ? 200 : 180
            },
            {
                title: formatMessage({ id: 'outWard.label.table-status' }),
                dataIndex: 'status',
                width: isMobile ? 100 : 130
            },
            {
                title: '',
                key: 'action',
                width: isMobile ? 400 : 360,
                render: () => (
                  <span>
                        <Button type="primary" onClick={this.showDrawerAssig}> 
                            <FormattedMessage id="outWard.button.assign"/>
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={this.showDrawerCompo}>
                            <FormattedMessage id="outWard.button.composition"/>
                        </Button>
                        <Divider type="vertical" />
                        <Checkbox>
                            <FormattedMessage id="outWard.button.confirm"/>
                        </Checkbox>      
                        <AssignmentOutWard 
                            visibleOne={this.state.visibleAssign}
                            closeOne={this.onCloseDrawerAssig}
                        />
                        <CompositionOutWard
                            visibleTwo={this.state.visibleCompo}
                            closeTwo={this.onCloseDrawerCompo}
                        />
                  </span>
                ),
            }
        ];
          const data = [
            {
                key: '1',
                date: 'Jue 8 Nov',
                pallets: "12/30",
                cajas: "360/900",
                status: 'Pendiente'
            },
            {
                key: '2',
                date: 'Vie 9 Nov',
                pallets: "12/30",
                cajas: "360/900",
                status: 'Completado'
            },
            {
                key: '3',
                date: 'Sab 10 Nov',
                pallets: "12/30",
                cajas: "360/900",
                status: 'En proceso'
            }
        ];         
        return (
            <Table columns={columns} dataSource={data} pagination={false} scroll={isMobile ? { x: 1000} : {x: 990}} size="small"/>
        );            
    }
}