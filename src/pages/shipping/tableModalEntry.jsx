import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const columns = [
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.id' }),
      dataIndex: 'id',
      key: 'id',
      width: 110,
    },
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.ubication' }),
      dataIndex: 'ubicacion',
      key: 'ubicacion',
      width: 100,
    },
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.output' }),
      dataIndex: 'salida',
      key: 'salida',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
      dataIndex: 'llegada',
      key: 'llegada',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
      dataIndex: 'entrada',
      key: 'entrada',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.shippingconfirmation.driver' }),
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
          <Table columns={columns} dataSource={data} scroll={{x: 'max-content'}} pagination={false}/>  
        );
        
    }      
  }
  export default tableModalEntry;