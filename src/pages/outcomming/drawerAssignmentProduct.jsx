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
        isFirstTime: true
    }

    componentDidMount() {}

    onChangeQuantityPallet = (e) => {
        let remaingQtyPallet = this.state.originalPallets;
        if (e.target.value === "") remaingQtyPallet;
            else remaingQtyPallet = remaingQtyPallet - parseInt(e.target.value);
        this.setState({
            pallets: remaingQtyPallet
        });
    }
    
    onChangeQuantityBox = (e) => {
        let remaingQtyBox = this.state.originalBox;
        if (e.target.value === "") remaingQtyBox;
            else remaingQtyBox = remaingQtyBox - parseInt(e.target.value);
        this.setState({
            box: remaingQtyBox
        });
    };

    onAccept = (_this) => {
        let payload = { 
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

        //if(_this.props.currentOutcomming.key === ""){
            //Post
            payload.date = _this.props.currentOutcomming.dayDate;
            payload.status = _this.props.currentOutcomming.status;
            payload.skProduct = _this.props.currentOutcomming.skProduct;
            payload.skCustomer = _this.props.currentOutcomming.skCustomer;
            payload.assignSh.skShipping = _this.props.currentShipping.pedido;
            payload.assignSh.assignments.box = 1;
            payload.assignSh.assignments.pallet = 1;
        //}else{
            //Put
        //}

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