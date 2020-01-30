import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import TableComposition from './TableComposition';
import { Modal, Button, Row, Col } from 'antd';

export default class ModalComposition extends PureComponent{
    state = {
        visible: false 
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };

    render(){
        const { dataFive, dataSix } = this.props;
        return(
            <span>
                <Button type="secundary" onClick={this.showModal}>Ver Composición</Button>
                <Modal
                    title="Composición pop up"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Row type="flex" justify="center">
                        <Col span={24}>
                            <TableComposition/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="end">
                        <Col span={dataFive} style={{textAlign:"right"}}>
                            <Button type="primary" onClick={this.handleCancel}>Aceptar</Button>
                        </Col>
                        <Col span={dataSix} style={{textAlign:"right"}}>
                            <Button type="success">Ir a asignación</Button>
                        </Col>
                    </Row> 
                </Modal>
            </span>
        );
    }
}