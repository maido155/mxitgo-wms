import { Modal, Button, Calendar, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import ButtonCenter from './buttonCenter';
import ModalCalendar from './modalCalendar';
import ButtonProduct from './buttonProduct';
import TableModal from './TableModal'; 


class ModalEdit extends PureComponent {
  state = { visible: false };


  render() {
    return (
      <div>
     
        <Modal
      title="Editar y visualizar"
      visible={this.props.stateModalEdit}
      onOk={this.props.ok}
      onCancel={this.props.cancel}
      
      footer={[
        <Button key="Limpiar" onClick={this.props.cancel}>
          Limpiar
        </Button>,
        <Button key="Aceptar" type="primary" onClick={this.props.ok}>
          Aceptar
        </Button>,
      ]}
        >
          
         <ModalCalendar/>
         <Divider type="horizontal"></Divider>
         <ButtonProduct/>
         <ButtonCenter/>
         <Divider type="horizontal"></Divider>
         <TableModal/>
        </Modal>
      </div>
    );
  }
}
    
export default ModalEdit;