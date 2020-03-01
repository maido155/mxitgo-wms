import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal, Row, Col, Typography  } from 'antd';
import Styles from './StylesGeneral.css';

const { Text } = Typography;

export default class ModalProductTable extends PureComponent{
    render(){
        return(
            <div>
                <Modal
                    title="Detalles"
                    visible={this.props.visipleModal}
                    onOk={this.props.ok}
                    onCancel={this.props.cancel}
                    width={"40%"}
                >
                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Envio</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>TE0101023912231</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Dia</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>Lunes</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Producto</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>Premium</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Planeado</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>1200</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Confirmado</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>1150</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text strong>Entrada</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>1100</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={4} className={Styles.labelone}>
                            <Text type="danger" strong>Faltante</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text type="danger">100</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}