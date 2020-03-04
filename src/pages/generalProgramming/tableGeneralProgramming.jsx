import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon } from 'antd';
import ModalEdit from './ModalEdit'


class TableGeneralProgramming extends PureComponent{
state = { visibleEdit: false };

showModalEdit = () => {
  this.setState({
    visibleEdit: true,
  });
};

handleOkEdit = e => {
  console.log(e);
  this.setState({
    visibleEdit: false,
  });
};

handleCancelEdit = e => {
  console.log(e);
  this.setState({
    visibleEdit: false,
  });
};


//pego las funciones bajo el class

    render(){
    
      const columns = [
        {
          title: 'Semana',
          dataIndex: 'week',
      
        },
        {
          title: 'Tipo de producto',
          dataIndex: 'products',
        },
        {
          title: 'Cliente',
          dataIndex: 'client',
        },
        {
            title: 'Cajas',
            dataIndex: 'box',
          },
          {
            title: 'Pallets',
            dataIndex: 'pallets',
          },
          {
            title: 'Status',
            dataIndex: 'status',
          }
      ];
      
      const data = [
        {
          key: '1',
          week: '10 - 12',
          products: "Gold",
          client: 'Vallejo',
          box:  "7400",
          pallets: "500",
          status: "Programado",
         
        },
        {
            key: '2',
          week: '6-12',
          products: "Premium",
          client: 'Cuautitlán',
          box:  "8200",
          pallets: "530",
          status: "220",
         
        },
        {
            key: '3',
          week: '31-5',
          products: "Gold",
          client: 'Reparto',
          box:  "7400",
          pallets: "500",
          status: "43",
         
        },
      ];
      
        if(isMobile){
          columns.push(
            {
              title: 'Acciones',
              key: 'action',
              fixed: 'right',
             
              render: () => (
                <span>
                 <a> <Icon type="edit" theme="filled" /> </a> 
                  <Divider type="vertical" />
                 <a onClick={this.showModalEdit}><Icon type="close-circle" theme="filled" /></a> 
                  <Divider type="vertical" />
                  <a>  <Icon type="arrows-alt" /></a> 
                  <Divider type="vertical" />
                  <a>  <Icon type="eye" theme="filled"  /> </a> 
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
                  <a onClick={this.showModalEdit}> Editar</a> 
                  <Divider type="vertical" />
                  <a><Icon type="close-circle" theme="filled" /></a>
                  <a> Cancelar</a>
                  <Divider type="vertical" />
                  <a><Icon type="arrows-alt" /></a>
                  <a> Pendiente</a>
                  <Divider type="vertical" />
                  <a><Icon type="eye" theme="filled"  /></a>
                  <a> Visualizar</a>
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
           <div>
            <ModalEdit
            stateModalEdit = {this.state.visibleEdit}
            ok = {this.handleOkEdit}
            cancel = {this.handleCancelEdit}
            />
              <Table  style={{marginTop: "2%"}} size="small" rowSelection={rowSelection} columns={columns} dataSource={data}  />
           </div>
        );
    }
}

export default TableGeneralProgramming;