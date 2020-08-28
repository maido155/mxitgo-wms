import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TableComponent from '../generalComponents/TableComponent';
import { Drawer, Form, Row, Col, Typography, Divider, Button, Icon, Input,DatePicker, AutoComplete,Spin, message } from 'antd';
import {isMobile} from 'react-device-detect';
import NewLine from './NewLine';
import Styles from './StylesShipping.css';
import { _ } from 'lodash';
import moment from 'moment';

const { Text } = Typography;
const { TextArea } = Input;

class ConfirmationShipping extends PureComponent {
    state={
        currentLoader: false,
        phoneOperator: '',
        departureDate: '',
        deliveryDate: '',
        entryDate: '',
        datesGeneralNewLine: {},
        idShipping: "", 
        whName: "",
        isFistValue: true
    }
    saveFormRefNewLine = (formRef) => {
        this.formRefNewLine = formRef;
    }
    newLineSelect = (newLine) => {
        let dataLocations = this.props.locationTreeData;
        let whSelect = dataLocations.filter(function(data){
            for (var i = 0; i < data.childLevel1.length; i++) {
                if (data.childLevel1[i].key == newLine) {
                    return data;
                }
            }
        })
        this.setState({whName: whSelect});
    }
    newLineCancelSelect = () => {
        this.setState({whName: ""});
        this.props.closeNewLine();
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
    nameOperatorSelect = (operator) => {
        let nameOperator = operator.map(function(data){
            if(data.operators.name != ""){
                return data.operators.name;
            }
        });
        return nameOperator
    }
    handleSubmitNewLine = (sLineMode, oState, oWarehouseData) => {
        /// Validate no duplicates for new lines
        const { locationTreeData } = this.props;
        var bDuplicate = false;
        if (sLineMode === "NEW") {
            var aWarehouse = this.props.warehouses;
            aWarehouse.forEach((oWarehouse, iIndex) => {
                if (oWarehouse.center === oWarehouseData.objWarehouse.center) {
                    bDuplicate = true;
                }
            });
        }
        oWarehouseData["locationTreeData"] = locationTreeData;
        if (!bDuplicate) {
            this.setState(oState);
            if (sLineMode === "NEW") {
                this.props.insertWarehouse(oWarehouseData);
            } else {
                this.props.replaceWarehouse(oWarehouseData, this.props.lineData.warehouseId);
            }
        }else{
            this.props.showMessage('warning', formatMessage({id:'shipping.drawerConfirm.messageWarningCenter'}));
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
            values["date"] = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["deliveryDate"] = this.state.deliveryDate == "" ? moment(values.deliveryDate).format("YYYY-MM-DD") + "T00:00:00.000Z" : moment(this.state.deliveryDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["departureDate"] = this.state.departureDate == "" ? moment(values.departureDate).format("YYYY-MM-DD") + "T00:00:00.000Z" : moment(this.state.departureDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["entryDate"] = this.state.entryDate == "" ? moment(values.entryDate).format("YYYY-MM-DD") + "T00:00:00.000Z" : moment(this.state.entryDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["dateNew"] = moment(this.state.datesGeneralNewLine.dateCreated).format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["createdByNew"] = this.state.datesGeneralNewLine.createdByNew;
            values["destination"] = "Central de abastos"
            values["products"] = this.props.products;
            values["warehouses"] = this.props.warehouseIds;
            values["comment"] = values.comment;

            let whareHouse = this.props.locationTreeData;
            let whSelect = whareHouse.filter(function(data) { //-- Add
                for (var i = 0; i < data.childLevel1.length; i++) {
                    if(Array.isArray(values.warehouses)){
                        if (data.childLevel1[i].key == values.warehouses[0]) {
                            return data;
                        }
                    }else{
                        if (data.childLevel1[i].key == values.warehouses) {
                            return data;
                        }
                    }
                }
            })
            values["warehousesSelect"] = whSelect;
            
            if (this.props.warehouseIds.length == 0) {
                message.warning(<FormattedMessage id='shipping.drawerEntry.messageWarningCenter'/>); //I18N *****************************************************************************************************
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
        const { oShippingItem, operatorAll, warehouses, masterMode, isSuccess, close, disableWarehouse } = this.props;
        const { phoneOperator }= this.state;
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        this.setState({ currentLoader });
       
        if (close == true) {
            this.props.closeConfirmation();
            this.props.changedClose();
        }
        //I18N ***************************************************************************************************** FECHAS NO SELECCIONADAS Y OPERADOR  LINEA 214 221 228 25
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
                    whName={this.state.whName}
                    masterMode={masterMode}
                    warehouses={warehouses}
                    oShippingItem={oShippingItem}
                    disableWarehouse={disableWarehouse}
                    locationTreeData={this.props.locationTreeData}
                    wrappedComponentRef={this.saveFormRefNewLine}
                    handleSubmitNewLine={this.handleSubmitNewLine}
                    newLineSelect={this.newLineSelect}
                    newLineCancelSelect={this.newLineCancelSelect}
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
                                            { initialValue: moment(oShippingItem.departureDate, "YYYY-MM-DD"), rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.dateMissing'/> }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onDepartureDate} disabled={oShippingItem.Operator == "" ? false : true}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                        {getFieldDecorator('deliveryDate',
                                            { initialValue: moment(oShippingItem.deliveryDate, "YYYY-MM-DD"), rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.dateMissing'/> }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onDeliveryDate} disabled={oShippingItem.Operator == "" ? false : true}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                        {getFieldDecorator('entryDate',
                                            { initialValue: moment(oShippingItem.entryDate, "YYYY-MM-DD"), rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.dateMissing'/> }] })
                                            (<DatePicker style={{ width: '100%' }} onChange={this.onEntryDate} disabled={oShippingItem.Operator == "" ? false : true}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-comments' })}>
                                        {getFieldDecorator('comment',{ initialValue: oShippingItem.comments != undefined ? oShippingItem.comments[0].comment : ""})(<TextArea disabled={oShippingItem.Operator == "" ? false : true}/>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            { oShippingItem.Operator == "" &&
                                <Row type="flex" justify="center" >
                                    <Col span={19} className={Styles.adddrawerone}>
                                        <Button type="primary" shape="circle" size="large" onClick={() => {this.props.showNewLineConfirm("NEW",{},"CONF")}}> 
                                            <Icon type="plus"/>
                                        </Button>
                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col span={24} className={Styles.tabledrawerone}>
                                    <TableComponent warehouse={warehouses} showNewLineConfirm={this.props.showNewLineConfirm} masterMode={this.props.masterMode} oShippingItem={oShippingItem}/>
                                </Col>
                            </Row>
                            <Row className={Styles.lastcolumn}>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.driver' })}>
                                    {getFieldDecorator('operator',{ initialValue: oShippingItem.Operator == "" ? "" : oShippingItem.Operator, rules: [{ required: true, message: <FormattedMessage id='shipping.confirm.operatorMissing'/> }]}) 
                                        (<AutoComplete
                                            dataSource={this.nameOperatorSelect(operatorAll)}
                                            filterOption={(inputValue, option) =>
                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onSelect={this.onSelect}
                                            disabled={oShippingItem.Operator == "" ? false : true}
                                        />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.phone' })}>
                                    {getFieldDecorator('phone',
                                    { initialValue: oShippingItem.phoneOperator == undefined ? phoneOperator : oShippingItem.phoneOperator})
                                        (<Input disabled={oShippingItem.Operator == "" ? false : true}/>
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
                            { oShippingItem.Operator == "" &&
                                <Button type="primary" htmlType="submit">
                                    <FormattedMessage id="shipping.button.conf"/>
                                </Button>    
                            }
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(ConfirmationShipping);