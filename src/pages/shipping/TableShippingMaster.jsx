import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon} from 'antd';
import ModalDeleteComponent from '../generalComponents/ModalDeleteComponent';

export default class TableShippingMaster extends PureComponent{
    render(){
      let columns = [
        {
          title: 'ID/Centros',
          dataIndex: 'id',
          key: 'id',
          width: 140,
          render: text => <a>{text}</a>
        },
        {
          title: 'Envío',
          dataIndex: 'envio',
          width: 100
        },
        {
          title: 'Llegada',
          dataIndex: 'llegada',
          width: 100
        },
        {
          title: 'Entrada',
          dataIndex: 'entrada',
          width: 100
        },
        {
          title: 'Premium (Plan/Conf)',
          dataIndex: 'premium',
          width: 100
        },
        {
          title: 'Gold (Plan/Conf)',
          dataIndex: 'gold',
          width: 100
        },
        {
          title: 'Segunda (Plan/Conf)',
          dataIndex: 'segunda',
          width: 100
        },
        {
          title: 'Mano (Plan/Conf)',
          dataIndex: 'mano',
          width: 100
        },
        {
          title: 'Dedo (Plan/Conf)',
          dataIndex: 'dedo',
          width: 100
        },
        {
          title: 'Status',
          dataIndex: 'status',
          width: 100
        }
      ];

      const data = [
        {
          key: '1',
          id: 'TE0101023912231',
          envio: 'Lunes',
          llegada: 'Martes',
          entrada: 'Miercoles',
          premium:'1200/1150',
          gold:'39/39',
          segunda:'0/39',
          mano: '0/39',
          dedo: '0/39',
          status: 'Pendiente'
        },
        {
          key: '2',
          id: 'TE0101023912232',
          envio: 'Martes',
          llegada: 'Miercoles',
          entrada: 'Jueves',
          premium:'300/-',
          gold:'220/-',
          segunda:'220/-',
          mano: '220/-',
          dedo: '220/-',
          status: 'Terminado'
        },
        {
          key: '3',
          id: 'TE0101023912233',
          envio: 'Miercoles',
          llegada: 'Jueves',
          entrada: 'Viernes',
          premium:'24/-',
          gold:'43/-',
          segunda:'43/-',
          mano: '43/-',
          dedo: '43/-',
          status: 'Proceso'
        }
      ];

      if(isMobile){
        columns.push(
          {
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            width: 130,
            render: () => (
              <span>
                  <a onClick={this.props.clickFirstTable}>
                    <Icon type="edit" />
                  </a>
                <Divider type="vertical" />
                  <a onClick={this.props.clickthirdTable}>
                    <Icon type="fullscreen" />
                  </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
                <Divider type="vertical" />
                  <a><Icon type="question" /></a>
              </span>
            ),
          }
        );
      }else{
        columns.push(
          {
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            width: 320,
            render: () => (
              <span>
                  <a onClick={this.props.clickFirstTable}>
                    <Icon type="edit" />Editar
                  </a>
                <Divider type="vertical" />
                  <a onClick={this.props.clickthirdTable}>
                    <Icon type="fullscreen" />Confirmar
                  </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
                <Divider type="vertical" />
                <a><Icon type="question" />Entrada</a>
              </span>
            ),
          }
        );
      }

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',
          name: record.name,
        }),
        };

        return(
            <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data} 
              scroll={{ x: 1300, y: 300 }} pagination={false}
            />
        );
    }
}