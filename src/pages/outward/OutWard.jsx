import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutWard from './TabsOutWard';
import { Card, Form, Row, Col } from 'antd';

export default class OutWard extends PureComponent {
    state = { 
        visibleOne: false,
        visibleTwo: false
    };
    showOne = () => {
        this.setState({
          visibleOne: true,
        });
    };
    showTwo = () => {
        this.setState({
          visibleTwo: true,
        });
    };
    onCloseOne = () => {
        this.setState({
          visibleOne: false,
        });
    };
    onCloseTwo = () => {
        this.setState({
          visibleTwo: false,
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 10 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 14  }}
        };
        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="start">
                                <Col xs={24} sm={20} md={18} lg={18} xl={18}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.week' })}>
                                        <RangePickerComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={12} md={16} lg={16} xl={8}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.product' })}>
                                        <RadioGroupComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <TabsOutWard 
                                        visibleDrawerOne={this.state.visibleOne}
                                        showDrawerOne={this.showOne}
                                        closeDrawerOne={this.onCloseOne}
                                        visibleDrawerTwo={this.state.visibleTwo}
                                        showDrawerTwo={this.showTwo}
                                        closeDrawerTwo={this.onCloseTwo}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}