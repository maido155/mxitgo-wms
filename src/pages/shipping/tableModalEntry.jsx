import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table} from 'antd';

const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 110,
    },
    {
      title: 'Ubicacion',
      dataIndex: 'ubicacion',
      key: 'ubicacion',
      width: 100,
    },
    {
      title: 'Salida',
      dataIndex: 'salida',
      key: 'salida',
      width: 100,
    },
    {
      title: 'Llegada',
      dataIndex: 'llegada',
      key: 'llegada',
      width: 100,
    },
    {
      title: 'Entrada',
      dataIndex: 'entrada',
      key: 'entrada',
      width: 100,
    },
    {
      title: 'Chofer',
      dataIndex: 'chofer',
      key: 'chofer',
      width: 100,
    },
  ];
  
  const data = [
   {
        id: 'TE10112801',
        ubicacion: 'Teapa',
        premium: 1200,
        gold: 38,
        segunda: 39,
        mano: 79,
        dedo: 800,
        salida: 'Mie 13-07',
        llegada: 'Jue 14-07',
        entrada: 'Vie 15-07',
        chofer: 'Ramòn',
      },
     
  ];

  class tableModalEntry extends PureComponent {
      
    render() {
        return (
          <Table columns={columns} dataSource={data} scroll={{x: 700}} pagination={false}/>  
        );
        
    }      
  }
  export default tableModalEntry;