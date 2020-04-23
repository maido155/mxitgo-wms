import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Icon, Form, Row, Col, Divider, DatePicker, Input } from 'antd';
import TableComponent from '../generalComponents/TableComponent';
import {isMobile} from 'react-device-detect';
import NewLine from './NewLine';
import { _ } from 'lodash';
import { connect } from 'dva';

const { TextArea } = Input;
var whNew = [];

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
}))

class DrawerShippingPrograming extends PureComponent {
    state={
        visibleNewLine: false,
        whNew: [],
        departureDate: '',
        deliveryDate: '',
        entryDate: ''
    }

    showNewLine = () =>{
        this.setState({
            visibleNewLine: true
        });
    };

    onCloseNewLine = () =>{
        this.setState({
            visibleNewLine: false
        });
    };

    saveFormRefNewLine = (formRef) => {
        this.formRefNewLine = formRef;
    }

    handleSubmit = (datesCenter) => {
        const form = this.formRefNewLine.props.form;
        let _self = this;
        form.validateFields((err, values) => {
            if(err){
                return;
            }
            var date = new Date();
            var datesNew = {
                center: datesCenter.props.fatherTitle + '-' + datesCenter.props.title,
                date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
                createdBy: localStorage.getItem('userName'),
                products: [{
                    product: 'PRODUCT-1',
                    amount: values.premium
                }]
            }
            whNew.push(datesNew);
            this.setState({whNew});
            form.resetFields();
            this.onCloseNewLine();
        });
    }

    handleSubmitShippingPrograming = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            values["departureDate"] = this.state.departureDate;
            values["deliveryDate"] = this.state.deliveryDate;
            values["entryDate"] = this.state.entryDate;
            values["datesWhNew"] = this.state.whNew;
            // console.log(values);
            this.saveShippingPrograming(values);
        });
    }

    saveShippingPrograming = (values) => {
        this.props.dispatch({
            type: 'user/saveShipping',
            payload: {
                payload: {
                    POST: {
                        typeCondition: "New",
                        isMasterModified: true,
                        comment: values.comment,
                        createdBy: values.datesWhNew[0].createdBy,
                        date: values.datesWhNew[0].date,
                        departureDate: values.departureDate,
                        deliveryDate: values.deliveryDate,
                        entryDate: values.entryDate,
                        destinity: values.datesWhNew[0].center,
                        skWh: "WH-1",
                        dateNew: values.datesWhNew[0].date,
                        createdByNew: values.datesWhNew[0].createdBy,
                        productNew: values.datesWhNew[0].products[0].product,
                        amountNew: values.datesWhNew[0].products[0].amount,
                    }
                }
            }
        })
    }

    onDepartureDate = (value, dateString) =>{
        this.setState({departureDate: dateString})
    }

    onDeliveryDate = (value, dateString) =>{
        this.setState({deliveryDate: dateString})
    }

    onEntryDate = (value, dateString) =>{
        this.setState({entryDate: dateString})
    }

    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <NewLine
                    visibleNewLine = {this.state.visibleNewLine}
                    onCloseNewLine = {this.onCloseNewLine}
                    wrappedComponentRef = {this.saveFormRefNewLine}
                    handleSubmit = {this.handleSubmit}
                />
                <Drawer
                    title={formatMessage({ id: 'shipping.drawershipping.label.title' })}
                    width={isMobile ? "100%" : "80%"}
                    closable={true}
                    onClose={this.props.onCloseShippingPrograming}
                    visible={this.props.visibleShippingPrograming} 
                    getContainer={isMobile ? false : true} 
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmitShippingPrograming}>
                        <Row>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-exit' })}>
                                    {getFieldDecorator('departureDate')(<DatePicker style={{ width: '100%'}} onChange={this.onDepartureDate}/>)}
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                    {getFieldDecorator('deliveryDate')(<DatePicker style={{ width: '100%'}} onChange={this.onDeliveryDate}/>)}
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                    {getFieldDecorator('entryDate')(<DatePicker style={{ width: '100%'}} onChange={this.onEntryDate}/>)}
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-comments' })}>
                                    {getFieldDecorator('comment')(<TextArea/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row type="flex" justify="center" >
                            <Col span={19} className={Styles.adddrawerone}>
                                <Button type="primary" shape="circle" size="large" onClick={this.showNewLine}>
                                    <Icon type="plus"/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className={Styles.tabledrawerone}>
                                <TableComponent 
                                    showNewLine = {this.showNewLine}
                                    datesWhNew = {this.state.whNew}
                                />
                            </Col>
                        </Row>
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
                            <Button type="danger" onClick={this.props.onCloseShippingPrograming} className={Styles.cancelarfooter}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" htmlType="submit">
                                <FormattedMessage id="shipping.button.program"/>
                            </Button>  
                        </div>   
                    </Form>
                </Drawer>
            </div>
        );
    }
}
export default Form.create()(DrawerShippingPrograming);