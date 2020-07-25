import React, { PureComponent } from 'react';
import Table from './TableAssignment';
import { _ } from 'lodash'; 
import { Drawer,Button, Form, Input} from 'antd';
import {isMobile} from 'react-device-detect';
import { Typography } from 'antd';

const { Text } = Typography;

export default class DrawerAssignmentProduct extends PureComponent {
    state = {
        pallets: 0,
        box: 0,
        isFirstTime: true,
        currentValuePallet: 0,
        currentValueBox: 0
    }

    componentDidMount() {}

    onChangeQuantityPallet = (e) => {
        var quantityBoxes = this.handleChangePallet();
        console.log("Boxes ----> ", quantityBoxes);
        this.props.datesProductAll;
        let remaingQtyPallet = this.state.originalPallets;
        if (e.target.value === "") remaingQtyPallet;
            else remaingQtyPallet = remaingQtyPallet - parseInt(e.target.value);
        this.setState({
            pallets: remaingQtyPallet,
            currentValuePallet: parseInt(e.target.value)
        });
    }
    
    onChangeQuantityBox = (e) => {
        let remaingQtyBox = this.state.originalBox;
        if (e.target.value === "") remaingQtyBox;
            else remaingQtyBox = remaingQtyBox - parseInt(e.target.value);
        this.setState({
            box: remaingQtyBox,
            currentValueBox: parseInt(e.target.value)
        });
    };

    handleChangePallet = () => {
        // this.validationProduct();

        let currentProduct = this.props.currentOutcomming.product;

        var quantityBoxes = this.props.datesProductAll.filter((el) => el.productName = currentProduct);
        return quantityBoxes;
        // var palletvsBoxes = this.props.datesProductAll;
        // const form = this.props.form;
        // let data = form.getFieldsValue();
        // var productName = data.productNew;
        // var quantityBoxes = 0;
        // var sumBoxes = 0;
        // for(var i = 0; i < palletvsBoxes.length; i++){
        //     if(palletvsBoxes[i]["WMS-1-SK"] == productName){
        //         quantityBoxes = palletvsBoxes[i].quantityBoxes;
        //     }
        // }
    }

    onAccept = (_this) => {
        let payload = { 
            key: "",
            date: "",//"2020-07-16T00:00:00.000Z",
            status: "",//"PENDING",
            skProduct: "",//"PRODUCT-1", 
            skCustomer: "",//"CUSTOMER-2", 
            assignSh: {
                    skShipping: "",//"SH-TAB972020954", 
                    assignments: {
                            box: "",
                            pallet: ""
                        }
                }
        }

        payload.key = _this.props.currentOutcomming.key;
        payload.date = _this.props.currentOutcomming.dayDate;
        payload.status = _this.props.currentOutcomming.status;
        payload.skProduct = _this.props.currentOutcomming.skProduct;
        payload.skCustomer = _this.props.currentOutcomming.skCustomer;
        payload.assignSh.skShipping = _this.props.currentShipping.pedido;
        payload.assignSh.assignments.box = _this.state.currentValueBox;
        payload.assignSh.assignments.pallet = _this.state.currentValuePallet;        

        _this.props.postOutcomming(payload);
        _this.props.onClose();
    }

    setCurrentValues = (pallets, box) => {
        if (this.state.isFirstTime && pallets !== undefined) {
            this.setState({
                pallets,
                box,
                originalPallets: pallets,
                originalBox: box,
                isFirstTime: false
            });
        }
    }

    render() {
        this.setCurrentValues(this.props.currentItem.cajasde, this.props.currentItem.palletsde);
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
        return (
            <Drawer
                title={'Asignación'}
                placement="right"
                width={isMobile ? "100%" : "50%"}
                closable={true}
                onClose={ (e) => { 
                    this.setState({
                        isFirstTime: true
                    })
                    this.props.onClose(e, this)}}
                visible={this.props.visible}
            >
                <Form {...formItemLayout} style={{marginTop: "5rem"}}>
                    <Form.Item label={'Pallets disponibles'}>
                        <Text>{this.state.pallets}</Text>
                    </Form.Item>
                    <Form.Item label={'Cajas disponibles'}>
                        <Text>{this.state.box}</Text> 
                    </Form.Item>
                    <Form.Item label={'Pallets'}>
                        <Input onChange={(e) => {this.onChangeQuantityPallet(e, this)}}/>
                    </Form.Item>
                    <Form.Item label={'Cajas'}>
                        <Input onChange={(e) => {this.onChangeQuantityBox(e, this)}}/>
                    </Form.Item>
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
                        <Button onClick={ (e) => { 
                    this.setState({
                        isFirstTime: true
                    })
                    this.props.onClose((e, this))}} style={{ marginRight: 8 }} type="danger">
                            Cancelar
                        </Button>
                        <Button onClick={()=>{this.onAccept(this)}} type="primary">
                            Aceptar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        );            
    }
}