import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider, Button, Checkbox  } from 'antd';
import AssignmentOutWard from './AssignmentOutWard';
import CompositionOutWard from './CompositionOutWard';

export default class TableOutWard extends PureComponent {
    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'date',
                width: 100
            },
            {
                title: 'Pallets asignados/requeridos',
                dataIndex: 'pallets',
                width: 190
            },
            {
                title: 'Cajas asignados/requeridos',
                dataIndex: 'cajas',
                width: 180
            },
            {
                title: '',
                key: 'action',
                width: 480,
                render: () => (
                  <span>
                        <Button type="primary" onClick={this.props.showDrawerOne}>Asignar</Button>
                        <AssignmentOutWard 
                            visibleOne={this.props.visibleDrawerOne}
                            closeOne={this.props.closeDrawerOne}
                        />
                    <Divider type="vertical" />
                        <Button onClick={this.props.showDrawerTwo}>Ver composición</Button>
                        <CompositionOutWard
                            visibleTwo={this.props.visibleDrawerTwo}
                            closeTwo={this.props.closeDrawerTwo}
                            showOne={this.props.showDrawerOne}
                            visibleOne={this.props.visibleDrawerOne}
                            closeOne={this.props.closeDrawerOne}
                        />
                    <Divider type="vertical" />
                        <Checkbox>Confirmar</Checkbox>      
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