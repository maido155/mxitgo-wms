import { Modal, Button, Calendar, Divider, Card,label } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import TableNewUser from './TableNewUser'


class ModalNewUser extends PureComponent {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}> Agregar Usuario</Button>
        <Modal
          title="Nuevo Usuario"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          
          footer={[
            <Button key="cancelar" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="crear" type="primary" onClick={this.handleOk}>
              Crear
            </Button>,
          ]}
        >
          
       <Card>
         <TableNewUser/>
       </Card>
        </Modal>
      </div>
    );
  }
}
    
export default ModalNewUser;