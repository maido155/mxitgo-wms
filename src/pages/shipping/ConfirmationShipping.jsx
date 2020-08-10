import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TableComponent from '../generalComponents/TableComponent';
import TextArea from '../generalComponents/TextAreaComponent';
import { Drawer, Form, Row, Col, Typography, Divider, Button, Icon, Input,DatePicker, AutoComplete,Spin, message } from 'antd';
import {isMobile} from 'react-device-detect';
import NewLine from './NewLine';
import Styles from './StylesShipping.css';
import { _ } from 'lodash';

const { Text } = Typography;

class ConfirmationShipping extends PureComponent {
    state={
        currentLoader: false,
        phoneOperator: '',
        departureDate: '',
        deliveryDate: '',
        entryDate: '',
        datesGeneralNewLine: {},
        idShipping: "", 
    }
    saveFormRefNewLine = (formRef) => {
        this.formRefNewLine = formRef;
    }
    onDepartureDate = (value, dateString) => {
        this.setState({ departureDate: dateString })
    }
    onDeliveryDate = (value, dateString) => {
        this.setState({ deliveryDate: dateString })
    }
    onEntryDate = (value, dateString) => {
        this.setState({ entryDate: dateString })
    }
    onSelect = (value) => {
        let phoneOperator = this.props.operatorAll.filter(function(data){
            return data.operators.name == value;
        })
        this.setState({phoneOperator: phoneOperator[0].operators.phone})
    }
    handleSubmitNewLine = (sLineMode, oState, oWarehouseData) => {
        /// Validate no duplicates for new lines
        var bDuplicate = false;
        if (sLineMode === "NEW") {
            var aWarehouse = this.props.warehouses;
            aWarehouse.forEach((oWarehouse, iIndex) => {
                if (oWarehouse.center === oWarehouseData.warehouseLine.center) {
                    message.warning('No es posible agregar 2 lineas del mismo centro');
                    bDuplicate = true;
                }
            });
        }
        if (!bDuplicate) {
            this.setState(oState);
            if (sLineMode === "NEW") {
                this.props.insertWarehouse(oWarehouseData);
            } else {
                this.props.replaceWarehouse(oWarehouseData);
            }
        }
    }
    handleSubmitShippingPrograming = e => {
        e.preventDefault();
        let _self = this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            var date = new Date();
            values["createdBy"] = localStorage.getItem('userName');
            values["date"] = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            values["deliveryDate"] = this.state.deliveryDate;
            values["departureDate"] = this.state.departureDate;
            values["entryDate"] = this.state.entryDate;
            values["dateNew"] = this.state.datesGeneralNewLine.dateCreated;
            values["createdByNew"] = this.state.datesGeneralNewLine.createdByNew;
            values["destination"] = "Central de abastos"
            values["products"] = this.props.products;
            values["warehouses"] = this.props.warehouseIds;
            values["comment"] = values.comment;
            if (this.props.warehouseIds.length == 0) {
                message.warning('Agregar Nueva Línea');
                return;
            }
            if(this.props.masterMode == "NEW"){
            values["idShipping"] = this.state.idShipping + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + date.getHours() + date.getMinutes();
            }else{
            values["idShipping"] = this.props.oShippingItem.idShipping;
            values["deliveryDate"] == "" ? values["deliveryDate"] = this.props.oShippingItem.originalDeliveryDate : values["deliveryDate"]; 
            values["departureDate"] == "" ? values["departureDate"] = this.props.oShippingItem.originalDepartureDate : values["departureDate"]; 
            values["entryDate"] == "" ? values["entryDate"] = this.props.oShippingItem.originalEntryDate : values["entryDate"]; 
        }
            _self.props.confirmShipping(values);
            this.props.form.resetFields();
        });
    }
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };
        const { getFieldDecorator } = this.props.form;
        const { oShippingItem, operatorAll} = this.props;
        const { phoneOperator }= this.state;
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        this.setState({ currentLoader });
        let nameOperator = operatorAll.map(function(data){
            return data.operators.name;
        });
        if (this.props.isSuccess == true) {
            if(this.props.masterMode == "NEW"){
                this.props.changedSuccess();
                message.success('Se agregó con éxito');
            }else{
                this.props.updateShippingSuccess();
                message.success('Se editó con éxito');
            }
        }
        if (this.props.close == true) {
            this.props.onCloseConfirmationShipping();
            this.props.changedClose();
        }
        return(
            <div>
                <NewLine
                    visibleNewLineConfirm={this.props.visibleNewLineConfirm}
                    closeNewLineConfirm={this.props.closeNewLineConfirm}
                    mode={this.props.mode}
                    productsAll={this.props.productsAll}
                    warehouseIds={this.props.warehouseIds}
                    lineData={this.props.lineData}
                    lineMode={this.props.lineMode}
                    locationTreeData={this.props.locationTreeData}
                    wrappedComponentRef={this.saveFormRefNewLine}
                    handleSubmitNewLine={this.handleSubmitNewLine}
                />
                <Drawer
                    title={formatMessage({ id: 'shipping.shippingconfirmation.title' })}
                    width={isMobile ? "100%" : "80%"}
                    closable={true}
                    onClose={this.props.closeConfirmation}
                    visible={this.props.visibleConfirmation} 
                    getContainer={isMobile ? false : true} 
                >
                    <Form {...formItemLayout}  onSubmit={this.handleSubmitShippingPrograming}>
                        <Spin spinning={this.state.currentLoader}>
                            <Row>
                                <Col lg={12} xl={12}>
                                    < Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.id-order' })}>
                                        <Text strong>{oShippingItem.idShipping}</Text>  
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-exit' })}>
                                        {getFieldDecorator('departureDate',
                                            { initialValue: oShippingItem.departureDate, rules: [{ required: true, message: "Fecha no seleccionada" }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onDepartureDate} />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                        {getFieldDecorator('deliveryDate',
                                            { initialValue: oShippingItem.deliveryDate, rules: [{ required: true, message: "Fecha no seleccionada" }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onDeliveryDate} />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                        {getFieldDecorator('entryDate',
                                            { initialValue: oShippingItem.entryDate, rules: [{ required: true, message: "Fecha no seleccionada" }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onEntryDate} />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-comments' })}>
                                        {getFieldDecorator('comment')(<TextArea />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Row type="flex" justify="center" >
                                <Col span={19} className={Styles.adddrawerone}>
                                    <Button type="primary" shape="circle" size="large" onClick={() => {this.props.showNewLineConfirm("NEW",{},"CONF")}}> 
                                        <Icon type="plus"/>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className={Styles.tabledrawerone}>
                                    <TableComponent warehouse={this.props.warehouses} showNewLineConfirm={this.props.showNewLineConfirm} masterMode={this.props.masterMode}/>
                                </Col>
                            </Row>
                            <Row className={Styles.lastcolumn}>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.driver' })}>
                                    {getFieldDecorator('operator',
                                    {rules: [{ required: true, message: "Operador no seleccionado" }]}) 
                                        (<AutoComplete
                                            dataSource={nameOperator}
                                            filterOption={(inputValue, option) =>
                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onSelect={this.onSelect}
                                        />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.phone' })}>
                                    {getFieldDecorator('phone',
                                    { initialValue: phoneOperator})
                                        (<Input />
                                    )}
                                    </Form.Item>
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
                            <Button type="danger" className={Styles.cancelarfooter} onClick={this.props.closeConfirmation}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" htmlType="submit">
                                <FormattedMessage id="shipping.button.conf"/>
                            </Button>    
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(ConfirmationShipping);