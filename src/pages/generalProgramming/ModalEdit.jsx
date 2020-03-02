import { Modal, Button, Calendar, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import ModalCalendar from './EditData';
import EditData from './EditData';

 


class ModalEdit extends PureComponent {
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
        <Button type="primary" shape="circle" icon="plus" onClick={this.showModal}>
        </Button>
        <Modal
          title="Nueva programación"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          
          footer={[
            <Button key="Limpiar" onClick={this.handleCancel}>
              Limpiar
            </Button>,
            <Button key="Aceptar" type="primary" onClick={this.handleOk}>
              Aceptar
            </Button>,
          ]}
        >
        
         <EditData/>
        </Modal>
      </div>
    );
  }
}
    
export default ModalEdit;