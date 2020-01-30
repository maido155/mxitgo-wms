import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon} from 'antd';

const columns = [
    {
        title: '',
        dataIndex: 'date',
      },
    {
      title: 'Pallets',
      dataIndex: 'pallets',

    },
    {
      title: 'Cajas',
      dataIndex: 'boxes',
    },
   
  ];

  const data = [
    {
        key: '1',
      date:'Jue 8 Nov',
      pallets: '',
      boxes: "",
      
    },
    {
        key: '2',
      date:'Vie 9 Nov',
      pallets: '',
      boxes: "",
      
    },
    {
        key: '3',
      date:'Sab 10 Nov',
      pallets: '',
      boxes: "",
    },
    {
        key: '4',
      date:'Dom 11 Nov',
      pallets: '',
      boxes: "",
      
    },
    {
        key: '5',
      date:'Lun 12 Nov',
      pallets: '',
      boxes: "",
      
    },
    {
        key: '7',
      date:'Mar 13 Nov',
      pallets: '',
      boxes: "",
    },
    {
        key: '8',
      date:'Mie 14 Nov',
      pallets: '',
      boxes: "",
      
    },
    {
      key: '8',
    date:'Total',
    pallets: '0',
    boxes: '0',
    
  },
  ];

  

class tableModal extends PureComponent{

    render(){
        return(
            <Table columns={columns} dataSource={data} />
        );
    }

}
export default tableModal;