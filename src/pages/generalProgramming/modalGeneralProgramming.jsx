import { Modal, Button, Calendar, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import ButtonCenter from './buttonCenter';
import ModalCalendar from './modalCalendar';
import ButtonProduct from './buttonProduct';
import TableModal from './TableModal'; 

import { FormattedMessage} from 'umi-plugin-react/locale';


class ModalGeneralProgramming extends PureComponent {
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
          title={<FormattedMessage id="general.modal-title.title"/>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          
          footer={[
            <Button key="Limpiar" onClick={this.handleCancel}>
              <FormattedMessage id="general.modal.clear"/>
            </Button>,
            <Button key="Aceptar" type="primary" onClick={this.handleOk}>
              <FormattedMessage id="general.modal.accept"/>
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
    
export default ModalGeneralProgramming;