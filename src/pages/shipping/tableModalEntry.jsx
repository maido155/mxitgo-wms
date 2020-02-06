import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table} from 'antd';
import {isMobile} from "react-device-detect";


const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ubicacion',
      dataIndex: 'ubicacion',
      key: 'ubicacion',
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
    },
    {
      title: 'Gold',
      dataIndex: 'gold',
      key: 'gold',
    },
    {
      title: 'Segunda',
      dataIndex: 'segunda',
      key: 'segunda',
    },
    {
      title: 'Mano',
      dataIndex: 'mano',
      key: 'mano',
    },
    {
      title: 'Dedo',
      dataIndex: 'dedo',
      key: 'dedo',
    },
    {
      title: 'Salida',
      dataIndex: 'salida',
      key: 'salida',
    },
    {
      title: 'Llegada',
      dataIndex: 'llegada',
      key: 'llegada',
    },
    {
      title: 'Entrada',
      dataIndex: 'entrada',
      key: 'entrada',
    },
    {
      title: 'Chofer',
      dataIndex: 'chofer',
      key: 'chofer',
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
       if (isMobile){
            return (
                <span>
                   <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}} pagination={false}/>  
                </span>
              );  
       }
        return (
          <span>
             <Table columns={columns} dataSource={data} pagination={false}/>  
          </span>
        );
        
    }      
  }
  export default tableModalEntry;