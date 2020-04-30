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
import { connect } from 'dva';

@connect(({ shipping, loading }) => ({
    shipping,
    loading: loading.models.shipping,
    warehouse:shipping.warehouse,
    isSuccess: shipping.isSuccess,
    close: shipping.close
}))

class ShippingMaster extends PureComponent {
    state={
        visibleShippingPrograming: false,
        visibleNewLine: false,
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
    showNewLine = () =>{
        this.setState({visibleNewLine: true});
    };
    onCloseNewLine = () =>{
        this.setState({
            visibleNewLine: false
        });
    };
    insertWarehouse = (...datesWarehouse) => {
        this.props.dispatch({
            type: 'shipping/saveWarehouse',
            payload: {
                center: datesWarehouse[0],
                premium: datesWarehouse[1],
                gold: datesWarehouse[2],
                second: datesWarehouse[3],
                hand: datesWarehouse[4],
                finger: datesWarehouse[5]
            }
        });
    }
    saveShipping= (datesShipping) => {
        this.props.dispatch({
            type: 'shipping/saveShipping',
            payload: {
                payload: {
                    POST: {
                        typeCondition: "New",
                        isMasterModified: true,
                        comment: datesShipping.comment,
                        createdBy: datesShipping.createdBy,
                        date: datesShipping.date,
                        departureDate: datesShipping.departureDate,
                        deliveryDate: datesShipping.deliveryDate,
                        entryDate: datesShipping.entryDate,
                        destinity: datesShipping.destinity,
                        products: datesShipping.products,
                        skWh: datesShipping.warehouse,
                        dateNew: datesShipping.dateNew,
                        createdByNew: datesShipping.createdByNew,
                    }
                }
            }
        })
    }
    changedSuccess = () => {
        this.props.dispatch({
            type: 'shipping/changedSuccess',
            payload: {}
        })
    }
    changedClose = () => {
        this.props.dispatch({
            type: 'shipping/changedClose',
            payload: {}
        })
    }
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };
        const { loading, warehouse, isSuccess, close } = this.props;
        return(
            <div>
                <ShippingPrograming
                    visibleShippingPrograming = {this.state.visibleShippingPrograming}
                    onCloseShippingPrograming = {this.onCloseShippingPrograming}
                    visibleNewLine = {this.state.visibleNewLine}
                    onCloseNewLine = {this.onCloseNewLine}
                    showNewLine= {this.showNewLine}
                    insertWarehouse = {this.insertWarehouse}
                    warehouse = {warehouse}
                    saveShipping = {this.saveShipping}
                    loading = {loading}
                    isSuccess = {isSuccess}
                    changedSuccess = {this.changedSuccess}
                    close = {close}
                    changedClose = {this.changedClose}
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