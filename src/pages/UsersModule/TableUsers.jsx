import React, { PureComponent } from 'react';
import { _ } from 'lodash';  
import { Card, Table, Icon, Divider } from 'antd';
import {isMobile} from 'react-device-detect';

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
]
if(isMobile){
  columns.push(
    {
      title: 'Acciones',
      key: 'action',
      fixed: 'right',
     
      render: () => (
        <span>
         <Icon type="edit" theme="filled" />
          <Divider type="vertical" />
          <Icon type="close-circle" theme="filled" />
          <Divider type="vertical" />
          <Icon type="arrows-alt" />
          <Divider type="vertical" />
          <Icon type="eye" theme="filled"  />
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
     
      render: () => (
        <span>
          <a><Icon type="edit" theme="filled" /></a>
          <a> Editar</a>
          <Divider type="vertical" />
          <a><Icon type="close-circle" theme="filled" /></a>
          <a> Eliminar</a>
        </span>
      ),
    }
  );
}


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