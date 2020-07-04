import React, { PureComponent } from 'react';
import Table from './TableAssignment';
import { _ } from 'lodash'; 
import { Drawer,Button, Form, Input} from 'antd';
import {isMobile} from 'react-device-detect';
import { Typography } from 'antd';

const { Text } = Typography;

export default class DrawerAssignmentProduct extends PureComponent {
    state = {
        pallets: 4,
        box: 10
    }

    onChangeQuantity = () => {
        let remaingQtyBox = this.state.box - 1,
            remaingQtyPallet = this.state.pallets - 1;
        this.setState({
          pallets: remaingQtyPallet,
          box: remaingQtyBox
        });
    };
    
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
        return (
            <Drawer
                title={'Asignación'}
                placement="right"
                width={isMobile ? "100%" : "50%"}
                closable={true}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Form {...formItemLayout} style={{marginTop: "5rem"}}>
                    <Form.Item label={'Pallets disponibles'}>
                        <Text>{this.state.pallets}</Text>
                    </Form.Item>
                    <Form.Item label={'Cajas disponibles'}>
                        <Text>{this.state.box}</Text> 
                    </Form.Item>
                    <Form.Item label={'Pallets'}>
                        <Input onChange={this.onChangeQuantity}/>
                    </Form.Item>
                    <Form.Item label={'Cajas'}>
                        <Input onChange={this.onChangeQuantity}/>
                    </Form.Item>
                    <div
                        style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.props.onClose} style={{ marginRight: 8 }} type="danger">
                            Cancelar
                        </Button>
                        <Button onClick={this.props.onClose} type="primary">
                            Aceptar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        );            
    }
}