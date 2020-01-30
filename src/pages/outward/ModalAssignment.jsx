import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal, Button } from 'antd';

class ModalAssignment extends PureComponent{
    state = {
        visible: false 
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleOk = e => {
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };

    render(){
        return(
            <span>
                <Button type="primary" onClick={this.showModal}>Asignar</Button>
                <Modal
                    title="Asignacion de salida"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
          </span>
        );
    }
}

export default ModalAssignment;