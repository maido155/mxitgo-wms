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
      dataIndex: 'Llegada',
      key: 'Llegada',
    },
    {
      title: 'Entrada',
      dataIndex: 'entrada',
      key: 'entrada',
    },
    {
      title: 'Chofer',
      dataIndex: 'Chofer',
      key: 'Chofer',
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
        salida: 13/7/19,
        llegada: 15/7/19,
        entrada: 15/7/19,
        chofer: 'Ramòn',
      },
     
  ];

  class tableModalEntry extends PureComponent {
      
    render() {
       if (isMobile){
            return (
                <span>
                   <Table columns={columns} dataSource={data} scroll={{x: 'calc(850px + 50%)', y: 240}} />  
                </span>
              );  
       }
        return (
          <span>
             <Table columns={columns} dataSource={data} />  
          </span>
        );
        
    }      
  }
  export default tableModalEntry;