import { Modal, Button, Calendar, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import ModalCalendar from './EditData';
import EditData from './EditData';

 


class ModalEdit extends PureComponent {
 

  

  render() {
    return (
      <div>
        <Modal
          title="Nueva programación"
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
        
         <EditData/>
        </Modal>
      </div>
    );
  }
}
    
export default ModalEdit;