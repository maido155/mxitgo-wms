import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Divider } from 'antd';

const columns = [
    {
      title: 'ID/Centros',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: text => <a>{text}</a>,
    },
    {
      title: 'Envio',
      dataIndex: 'envio',
      width: 110
    },
    {
      title: 'Llegada',
      dataIndex: 'llegada',
      width: 110
    },
    {
        title: 'Entrada',
        dataIndex: 'entrada',
        width: 110
    },
    {
        title: 'Premium (Plan/Conf)',
        dataIndex: 'premium',
        width: 120
    },
    {
        title: 'Gold (Plan/Conf)',
        dataIndex: 'gold',
        width: 110
    },
    {
        title: 'Segunda (Plan/Conf)',
        dataIndex: 'segunda',
        width: 120
    },
    {
        title: 'Mano (Plan/Conf)',
        dataIndex: 'mano',
        width: 110
    },
    {
        title: 'Dedo (Plan/Conf)',
        dataIndex: 'dedo',
        width: 110
    },
    {
        title: 'Acciones',
        key: 'action',
        fixed: 'right',
        width: 270,
        render: () => (
          <span>
            <a>Editar</a>
            <Divider type="vertical" />
            <a>Confirmar</a>
            <Divider type="vertical" />
            <a>Eliminar</a>
            <Divider type="vertical" />
            <a>Entrada</a>
          </span>
        ),
      },
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
        dedo: '0/39'

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
        dedo: '220/-'
  
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
        dedo: '43/-'
  
    }
];
  
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
};

class TableShippingMaster extends PureComponent{
    render(){
        return(
            <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }}/>
        );
    }
}

export default TableShippingMaster;