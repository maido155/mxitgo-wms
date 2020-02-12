import React, { PureComponent } from 'react';
import Table from './TableAssignment';
import { _ } from 'lodash'; 
import { Drawer,Row, Col, Button, Icon, Divider } from 'antd';

export default class AssignmentOutWard extends PureComponent {
    render() {
        return (
            <Drawer
                title="Asignación de salida"
                placement="right"
                width={"80%"}
                closable={true}
                onClose={this.props.closeOne}
                visible={this.props.visibleOne}
            >
                <Row type="flex" justify="center">
                    <Col xs={24} sm={1} md={1} lg={1} xl={1} style={{textAlign: "center"}}>
                        <Icon type="shopping-cart" />
                    </Col>
                    <Col xs={24} sm={12} md={9} lg={7} xl={5} style={{textAlign: "center"}}>
                        200 de 1500 cajas asignadas
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={6} xl={3} style={{textAlign: "center"}}>
                        <Button type="danger">Empezar de nuevo</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table/>
                    </Col>
                </Row>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button style={{marginRight: 8,}} onClick={this.props.closeOne}>Cancelar</Button>
                    <Button onClick={this.props.closeOne} type="primary">Aceptar</Button>
                </div>
            </Drawer>
        );            
    }
}