import React, { PureComponent } from 'react';
import { _ } from 'lodash';  
import { Card, Table } from 'antd';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',

  },
  {
    title: 'Apellido paterno',
    dataIndex: 'firstLastName',
  },
  {
    title: 'Apellido materno',
    dataIndex: 'secondLastName',
  },
  {
      title: 'Correo electrónico',
      dataIndex: 'email',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
    }
];


const data = [
  
  {
    name: 'Héctor Ulises',
    firstLastName: 'Robledo',
    secondLastName: "Oropeza",
    email: 'hectoorn.n@gmail.com',
    phone:  "4494681489",
 
   
  }
];

  
  


class TableUsers extends PureComponent{
    render(){
        return(
            <Table  style={{marginTop: "2%"}} size="small" columns={columns} dataSource={data}  />
        );
    }
}

export default TableUsers;