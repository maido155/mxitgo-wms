import { Modal, Button, Calendar, Divider, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 



class ModalCancel extends PureComponent {
  

 

  render() {
    return (
      <div>
       
        <Modal
          title="¿Eliminar registro?"
          visible={this.props.stateModalCancel}
          onOk={this.props.ok}
          onCancel={this.props.cancel}
          footer={[
            <Button  key="cancel"  type="danger"  onClick={this.props.cancel} >
                <Icon type="close" />
              Cancelar
            </Button>,
            <Button key="ok" type="primary" onClick={this.props.ok}>
                <Icon type="check" />
              Aceptar
            </Button>,
          ]}
        >
          
         
        </Modal>
      </div>
    );
  }
}
    
export default ModalCancel;