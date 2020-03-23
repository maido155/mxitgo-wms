import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutWard from './AssignmentOutWard';
import CompositionOutWard from './CompositionOutWard';

export default class TableOutWard extends PureComponent {
    state = { 
        visibleAssign: false,
        visibleCompo: false
    };
    showOne = () => {
        this.setState({
          visibleAssign: true,
        });
    };
    showTwo = () => {
        this.setState({
          visibleCompo: true,
        });
    };
    onCloseOne = () => {
        this.setState({
          visibleAssign: false,
        });
    };
    onCloseTwo = () => {
        this.setState({
          visibleCompo: false,
        });
    };
    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'date',
                width: 100
            },
            {
                title: formatMessage({ id: 'outWard.label.table-pallets' }),
                dataIndex: 'pallets',
                width: 190
            },
            {
                title: formatMessage({ id: 'outWard.label.table-boxes' }),
                dataIndex: 'cajas',
                width: 180
            },
            {
                title: '',
                key: 'action',
                width: 480,
                render: () => (
                  <span>
                        <Button type="primary" onClick={this.showOne}>
                            <FormattedMessage id="outWard.button.assign"/>
                        </Button>
                        <AssignmentOutWard 
                            visibleOne={this.state.visibleAssign}
                            closeOne={this.onCloseOne}
                        />
                    <Divider type="vertical" />
                        <Button onClick={this.showTwo}>
                            <FormattedMessage id="outWard.button.composition"/>
                        </Button>
                        <CompositionOutWard
                            visibleTwo={this.state.visibleCompo}
                            closeTwo={this.onCloseTwo}
                            showOne={this.showOne}
                            visibleOne={this.state.visibleAssign}
                            closeOne={this.onCloseOne}
                        />
                    <Divider type="vertical" />
                        <Checkbox>
                            <FormattedMessage id="outWard.button.confirm"/>
                        </Checkbox>      
                  </span>
                ),
            }
        ];
          const data = [
            {
                key: '1',
                date: 'Jue 8 Nov',
                pallets: "12/30",
                cajas: "360/900"
            },
            {
                key: '2',
                date: 'Vie 9 Nov',
                pallets: "12/30",
                cajas: "360/900"
            },
            {
                key: '3',
                date: 'Sab 10 Nov',
                pallets: "12/30",
                cajas: "360/900"
            }
        ];         
        return (
            <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 970, y: 300 }} size="small"/>
        );            
    }
}