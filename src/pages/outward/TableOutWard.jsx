import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import {isMobile, isMobileOnly} from 'react-device-detect';
import ModalAssignment from './ModalAssignment';
import ModalComposition from './ModalComposition';
import { Table, Button, Divider } from 'antd';

const columns = [
    {
        title: '',
        width: 90,
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Pallets asignados/requeridos',
        width: 200,
        dataIndex: 'pallets'
    },
    {
        title: 'Cajas asignados/requeridos',
        width: 200,
        dataIndex: 'cajas'
    },
];

if(isMobileOnly){
    columns.push(
        {
            title: '',
            key: 'action',
            width: 380,
            render: () => (
              <span>
                  <Divider type="vertical" />
                    <ModalAssignment/>
                  <Divider type="vertical" />
                    <ModalComposition dataFive={7} dataSix={10}/>
                  <Divider type="vertical" />
                  <Button type="primary">Confirmar</Button>
              </span>
            ),
          }
    );
}else{
    columns.push(
        {
            title: '',
            key: 'action',
            width: 380,
            render: () => (
              <span>
                  <Divider type="vertical" />
                    <ModalAssignment/>
                  <Divider type="vertical" />
                    <ModalComposition dataFive={5} dataSix={7}/>
                  <Divider type="vertical" />
                  <Button type="primary">Confirmar</Button>
              </span>
            ),
          }
    );
}

const data = [
    {
        key: '1',
        date: 'Jue 8 Nov',
        pallets: '12/30',
        cajas: '360/900'
    }
];

export default class TableOutWard extends PureComponent{
    render(){
        if(isMobile){
            return(
                <div>
                    <Table columns={columns} dataSource={data} size="small" scroll={{ x: 400, y: 300 }}/>,
                </div>
            );  
        }
        return(
            <div>
                <Table columns={columns} dataSource={data} size="small"/>,
            </div>
        );
    }
}