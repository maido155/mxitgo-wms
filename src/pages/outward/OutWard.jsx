import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutWard from './TabsOutWard';
import { Card, Form, Row, Col } from 'antd';
import TableOutWard from './TableOutWard';

export default class OutWard extends PureComponent {
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };
        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center"> 
                                <Col xs={1} sm={1} md={1} lg={1} xl={16}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.week' })}>
                                        <RangePickerComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={1} sm={1} md={1} lg={1} xl={8}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.product' })}>
                                        <RadioGroupComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={1} sm={1} md={1} lg={1} xl={10}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.client' })}>
                                        <TabsOutWard/>
                                    </Form.Item>  
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <TableOutWard/>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}