import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Icon, Form, Row, Col, Divider } from 'antd';
import DatePicker from '../generalComponents/DatePickerComponent';
import TextArea from '../generalComponents/TextAreaComponent';
import TableComponent from '../generalComponents/TableComponent';
import {isMobile} from 'react-device-detect';
import NewLine from './NewLine';
import { _ } from 'lodash';

var whNew = [];
class DrawerShippingPrograming extends PureComponent {
    state={
        visibleNewLine: false,
        whNew: [] 
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
                    ammount: values.premium
                }]
            }
            whNew.push(datesNew);
            this.setState({whNew});
            form.resetFields();
            this.onCloseNewLine();
        });
    }

    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };
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
                    <Form {...formItemLayout}>
                        <Row>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-exit' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-comments' })}>
                                    <TextArea/>
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
                            <Button type="primary" onClick={this.props.onCloseShippingPrograming}>
                                <FormattedMessage id="shipping.button.program"/>
                            </Button>  
                        </div>   
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default DrawerShippingPrograming;