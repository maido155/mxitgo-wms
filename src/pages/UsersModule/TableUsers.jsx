import React, { PureComponent } from 'react';
import { _ } from 'lodash';  
import { Card, Table, Icon, Divider, Form } from 'antd';
import {isMobile} from 'react-device-detect';
import { connect } from 'dva';




@Form.create()
@connect(({ users, loading }) => ({
   users,
    loading: loading.models.users,
    cognitoUsers:users.cognitoUsers
}))
 

class TableUsers extends PureComponent{

   
  
  
  componentDidMount() {
    this.props.dispatch({
       type: 'users/fetchCognitoUsers',//nombre del modelo y la función
       payload: {
           //lo que se quiere buscar en la base de datos (igual a la lambda.)
       },
   });
}

    render(){

      const { loading, users: { users },cognitoUsers } = this.props;

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
      

        return(
            <Table  style={{marginTop: "2%"}} size="small" columns={columns} dataSource={cognitoUsers}  />
        );
    }
}

export default TableUsers;
