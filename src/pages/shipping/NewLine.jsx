import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button,Row, Col, InputNumber, Form } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import TreeSelectComponent from '../generalComponents/TreeSelectComponent';
import {isMobile} from 'react-device-detect';

export default  class NewLine extends PureComponent{
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
            return(
                <Drawer
                    title={formatMessage({ id: 'shipping.newline.label.title' })}
                    width={isMobile ? "100%" : "50%"}
                    closable={true}
                    onClose={this.props.closeDrawer}
                    visible={this.props.visibleDrawer}
                >
                    <Form {...formItemLayout} className={Styles.formnweline}>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.center' })}>
                            <TreeSelectComponent/>
                        </Form.Item>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.premium' })}>
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.gold' })}>
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.second' })}>
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.hand' })}>
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
                        </Form.Item>
                        <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.finger' })}>
                            <InputNumber min={1} max={500} defaultValue={0} style={{ width: '100%'}}/>
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
                            <Button type="danger" onClick={this.props.closeDrawer} className={Styles.cancelarfooter}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" onClick={this.props.closeDrawer}>
                                <FormattedMessage id="shipping.button.program"/>
                            </Button>    
                        </div>
                    </Form>
            </Drawer>
        );
    }
}