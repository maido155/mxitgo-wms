import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Icon, Form, Row, Col, Divider, DatePicker, Input, message, Spin, Card } from 'antd';
import TableComponent from '../generalComponents/TableComponent';
import {isMobile} from 'react-device-detect';
import NewLine from './NewLine';
import { _ } from 'lodash';

const { TextArea } = Input;
class DrawerShippingPrograming extends PureComponent {
    state={
        departureDate: '',
        deliveryDate: '',
        entryDate: '',
        currentLoader:false,
        datesGeneralNewLine: {},
        products: [],
        warehouseName: [],
        idShipping : "",
    }
    saveFormRefNewLine = (formRef) => {
        this.formRefNewLine = formRef;
    }
    handleSubmitNewLine = (datesWarehouse) =>{
        const form = this.formRefNewLine.props.form;
        form.validateFields((err, values) => {
            if(err){
                return;
            }
            if(datesWarehouse.props.fatherTitle == undefined){
                message.warning('Tiene que agregar un centro');
                return;
            }
            var warehouse = datesWarehouse.props.fatherTitle + '-' + datesWarehouse.props.title;
            var idWarehouse = datesWarehouse.props.eventKey; 
            var idShipping = datesWarehouse.props.fatherValue;
            var premium = values.premium;
            var finger = values.finger;
            var gold = values.gold;
            var hand = values.hand;
            var second = values.second;
            var date = new Date();
            this.state.datesGeneralNewLine = {
                dateCreated: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
                createdByNew: localStorage.getItem('userName'),
            }
            var nameProducts = ["premium","gold","second","hand","finger"];
            var quantities = [premium,gold,second,hand,finger];
            this.state.warehouseName.push(idWarehouse);
            this.setState({idShipping});
            var products = [];
            for(var i = 0; i < nameProducts.length; i++){
                products.push({
                    product: nameProducts[i],
                    amount: quantities[i]
                });
            }
            products = [...this.state.products,products];
            this.state.products = products;
            this.props.insertWarehouse(warehouse, premium, gold, second, hand, finger);
            form.resetFields();
            this.props.onCloseNewLine();
        });
    }
    handleSubmitShippingPrograming = e => {
        e.preventDefault();
        let _self = this;
        this.props.form.validateFields((err, values) => {
            if(err){
                return;
            }
            var date = new Date();
            values["createdBy"] = localStorage.getItem('userName');
            values["date"] =  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            values["deliveryDate"] = this.state.deliveryDate;
            values["departureDate"] = this.state.departureDate;
            values["entryDate"] = this.state.entryDate;
            values["dateNew"] = this.state.datesGeneralNewLine.dateCreated;
            values["createdByNew"] = this.state.datesGeneralNewLine.createdByNew;
            values["destinity"] = "Central de abastos"
            values["products"] = this.state.products;
            values["warehouse"] = this.state.warehouseName;
            values["idShipping"] = this.state.idShipping + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + date.getHours() + date.getMinutes();
            var warehouseDate = values.warehouse;
            var warehouse = this.props.warehouse;
            if(warehouse.length == 0){
                message.warning('Agregar Nueva Línea');
                return;
            }
            if(warehouseDate.length == 0 && warehouse.length == 0){
                message.warning('Agregar Nueva Línea');
                return;
            }
            _self.props.saveShipping(values);
            this.props.form.resetFields();
        });
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
        let currentLoader= this.props.loading === undefined ? false : this.props.loading;
        this.setState({  currentLoader });
        if(this.props.isSuccess == true){
            this.props.changedSuccess();
            message.success('Se agregó con éxito');
        }
        if(this.props.close == true){
            this.props.onCloseShippingPrograming();
            this.props.changedClose();
        }
        return(
            <div>
                <NewLine
                    visibleNewLine = {this.props.visibleNewLine}
                    onCloseNewLine = {this.props.onCloseNewLine}
                    wrappedComponentRef = {this.saveFormRefNewLine}
                    handleSubmit = {this.handleSubmitNewLine}
                />
                <Drawer
                    title={formatMessage({ id: 'shipping.drawershipping.label.title' })}
                    width={isMobile ? "100%" : "80%"}
                    closable={true}
                    onClose={this.props.onCloseShippingPrograming}
                    visible={this.props.visibleShippingPrograming} 
                    getContainer={isMobile ? false : true} 
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmitShippingPrograming}>
                        <Spin spinning={this.state.currentLoader}>
                            <Row>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-exit' })}>
                                        {getFieldDecorator('departureDate',
                                        {rules: [{required: true, message: "Fecha no seleccionada"}]})
                                        (<DatePicker style={{ width: '100%'}} onChange={this.onDepartureDate}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                        {getFieldDecorator('deliveryDate',
                                        {rules: [{required: true, message: "Fecha no seleccionada"}]})
                                        (<DatePicker style={{ width: '100%'}} onChange={this.onDeliveryDate}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                        {getFieldDecorator('entryDate',
                                        {rules: [{required: true, message: "Fecha no seleccionada"}]})
                                        (<DatePicker style={{ width: '100%'}} onChange={this.onEntryDate}/>)}
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
                                    <Button type="primary" shape="circle" size="large" onClick={this.props.showNewLine}>
                                        <Icon type="plus"/>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className={Styles.tabledrawerone}>
                                    <TableComponent showNewLine = {this.props.showNewLine} warehouse = {this.props.warehouse}/>
                                </Col>
                            </Row>
                        </Spin>
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