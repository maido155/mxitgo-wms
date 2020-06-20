import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutComming from './TabsOutComming';
import { Card, Form, Row, Col } from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';

@connect(({ outcomming, loading }) => ({
    outcomming,
    loading: loading.models.outcomming,
}))
export default class OutComming extends PureComponent {
    
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

        let {compositionData} = this.props.outcomming;

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
                                        <RangePickerComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={8}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.product' })}>
                                        <RadioGroupComponent/>
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
                                    <TableOutComming onConfirm = {this.onConfirm} loading = {this.props.loading} compositionData={compositionData} onShowCompositionData = {this.onShowCompositionData}/>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}