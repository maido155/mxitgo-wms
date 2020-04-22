import React, { PureComponent } from 'react';
import Styles from './StylesShipping.css';
import { Card, Button, Icon, Form, Row, Col, Divider } from 'antd'; 
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import TableShippingMaster from './TableShippingMaster';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ShippingPrograming from './DrawerShippingPrograming';
import { formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';

class ShippingMaster extends PureComponent {
    state={
        visibleShippingPrograming: false
    }
    showShippingPrograming = () =>{
        this.setState({
            visibleShippingPrograming: true
        });
    };
    onCloseShippingPrograming = () =>{
        this.setState({
            visibleShippingPrograming: false
        });
    };

    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };
        return(
            <div>
                <ShippingPrograming
                    visibleShippingPrograming = {this.state.visibleShippingPrograming}
                    onCloseShippingPrograming = {this.onCloseShippingPrograming}
                />
                <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.week' })}>
                                        <RangePickerComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={8}>
                                    <Form.Item label={formatMessage({ id: 'outWard.label.product' })}>
                                        <RadioGroupComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Divider/>
                        <Row>
                            <Col span={22} className={Styles.addshippingmaster}>
                                <Button type="primary" shape="circle" size="large" onClick={this.showShippingPrograming}>
                                    <Icon type="plus"/>
                                </Button>
                            </Col>  
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TableShippingMaster
                                    showShippingPrograming={this.showShippingPrograming} 
                                />
                            </Col>
                        </Row>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default ShippingMaster;