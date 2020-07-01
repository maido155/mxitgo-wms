import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from './RangePickerOutcomming';
import RadioGroupComponent from './RadioGroupOutcomming';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutComming from './TabsOutComming';
import { Card, Form, Row, Col, Spin } from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';
import RangePickerOutcomming from './RangePickerOutcomming';
import RadioGroupOutcomming from './RadioGroupOutcomming';

@connect(({ outcomming, loading }) => ({
    outcomming,
    loading: loading.models.outcomming,
    datesOutcomming:outcomming.datesOutcomming,
}))
export default class OutComming extends PureComponent {
    
    componentDidMount() {

        this.props.dispatch({
            type: 'outcomming/getOutcomming',
            payload: { Product: "PRODUCT-1",Customer: "CUSTOMER-2", DateFrom: "2020-06-25T00:00:00.000Z", DateTo: "2020-06-30T00:00:00.000Z"}
        })
        
    };

    onConfirm = (id) => {
         
        this.props.dispatch({
            type: 'outcomming/confirmOutcomming',
            payload: {SK: id, operation: "UPDATE_STATUS", status: "CONFIRMED"}
        })

    };

    onShowCompositionData = (id) => {
         
        this.props.dispatch({  
            type: 'outcomming/getComposition',  
            payload: {PK: id}
        }); 

    };
    
    render() {
        let {compositionData, datesOutcomming} = this.props.outcomming;

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };
        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center"> 
                                <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.week' })}>
                                        <RangePickerOutcomming/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={8}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.product' })}>
                                        <RadioGroupOutcomming/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={10}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.client' })}>
                                        <TabsOutComming/>
                                    </Form.Item>  
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <TableOutComming datesOutcomming = {datesOutcomming} onConfirm = {this.onConfirm} loading = {this.props.loading} compositionData={compositionData} onShowCompositionData = {this.onShowCompositionData}/>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}