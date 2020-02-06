import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button,Row, Col, InputNumber, Form } from 'antd';
import Styles from './StylesShipping.css';
import TreeSelectComponent from '../generalComponents/TreeSelectComponent';

export default  class NewLine extends PureComponent{
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
        const tailFormItemLayout = {
            wrapperCol: {xs: {span: 24,offset: 0,},sm: {span: 12,offset: 8}, md: {span: 12,offset: 8},
                        lg: {span: 12,offset: 8}, xl: {span: 14,offset: 6}}
        };
        return(
                <Drawer
                    title="Nueva Linea"
                    width={"50%"}
                    closable={true}
                    onClose={this.props.closeDrawer}
                    visible={this.props.visibleDrawer}
                >
                    <Form {...formItemLayout} className={Styles.formnweline}>
                        <Form.Item label="Centro">
                            <TreeSelectComponent/>
                        </Form.Item>
                        <Form.Item label="Premium">
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="Gold">
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="Segunda">
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="Mano">
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label="Dedo">
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>                  
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'center',
                        }}
                    >
                        <Row type="flex" justify="center">
                            <Col xs={24} sm={10} md={10} xl={6} className={Styles.cancelarfooter}>
                                <Button type="primary" onClick={this.props.closeDrawer}>
                                    Programar
                                </Button>
                            </Col>
                            <Col xs={24} sm={10} md={10} xl={6}>
                                <Button type="danger" onClick={this.props.closeDrawer}>
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Drawer>
        );
    }
}