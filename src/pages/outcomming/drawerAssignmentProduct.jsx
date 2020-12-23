import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button, Form, InputNumber, Input, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { isMobile } from 'react-device-detect';
import { Typography } from 'antd';

const { Text } = Typography;

export default class DrawerAssignmentProduct extends PureComponent {
    state = {
        palletsResult: '',
        boxesResult: 0,
        iValuePallet: 0,
        iValueBox: 0,
    }

    onChangeQuantityPallet = (e) => {

        const { pallets,  box, currentValuePallet , currentValueBox, isFirstTime, boxesRequired } = this.props;

        let quantityBoxes = this.handleChangePallet(); // obtenemos la cantidad del tipo de producto ( premium = 25, gold = 20)

        let remaingQtyPallet = currentValuePallet; // pallets disponibles
        let remaingQtyBox = currentValueBox; // cajas disponibles

        let valuePallet = e; // pallets seleccionadas

        let rPallets = remaingQtyPallet - valuePallet; // pallets resultado 

        let boxesDis = remaingQtyBox - (valuePallet * quantityBoxes); // boxes resultado 

        let boxesShow;

        if(boxesDis > 0 ){
            boxesShow = remaingQtyBox - boxesDis;
        }else{
            boxesDis = 0;
            boxesShow = remaingQtyBox;
        }

        this.setState({
            palletsResult: rPallets,
            iValuePallet: valuePallet,
            iValueBox: boxesShow,
            boxesResult: boxesDis
        })

    }

    onChangeQuantityBox = (e) => {

        const { pallets,  box, currentValuePallet , currentValueBox, isFirstTime } = this.props;

        let quantityBoxes = this.handleChangePallet();

        let palletsMath = e / quantityBoxes;

        palletsMath = Math.ceil(palletsMath);

        let palletsDis = currentValuePallet - palletsMath;
        let boxesDis = currentValueBox - e

        this.setState({
            iValueBox: e,
            iValuePallet: palletsMath,
            palletsResult: palletsDis,
            boxesResult: boxesDis
        })
    };

    handleChangePallet = () => {

        let currentProduct = this.props.currentOutcomming.product;

        var filteredItem = this.props.datesProductAll.filter((el) => {
            if (el.productName === currentProduct) return el;
        });

        return filteredItem[0].quantityBoxes;

    }

    onAccept = (_this) => {
        const { iValuePallet, iValueBox } = this.state;
        const { boxesRequired, datesOutcomming } = this.props;

        if(iValuePallet === 0 & iValueBox === 0){
            message.warning('You did not assign Pallets or Boxes');
            return;
        }

        if(iValueBox > boxesRequired){
            message.warning('Only ' +  boxesRequired + ' boxes needed');
            return;
        }

        let payload = {
            key: "",
            date: "",//"2020-07-16T00:00:00.000Z",
            status: "",//"PENDING",
            skProduct: "",//"PRODUCT-1", 
            skCustomer: "",//"CUSTOMER-2",
            skShipping: "",//assignShipping, 
            box: 0, //assignments
            pallet: 0 //assignments
        }

        let getOutComming = datesOutcomming.filter(function(data){
            return data.dayDate === _this.props.currentOutcomming.dayDate;
        })

        payload.key = getOutComming[0].key;
        payload.date = _this.props.currentOutcomming.dayDate;
        payload.status = _this.props.currentOutcomming.status;
        payload.skProduct = _this.props.currentOutcomming.skProduct;
        payload.skCustomer = _this.props.currentOutcomming.skCustomer;
        payload.skShipping = _this.props.shipment;
        payload.box = _this.state.iValueBox;
        payload.pallet = _this.state.iValuePallet;
        _this.props.postOutcomming(payload);
        this.setState({
            // isFirstTime: true
            palletsResult: '',
            boxesResult: 0,
            iValuePallet: 0,
            iValueBox: 0,
        })
        _this.props.onClose();
    }


    render() {

        const {pallets,  box, currentValuePallet , currentValueBox, isFirstTime, boxesRequired} = this.props;
        const { iValuePallet, iValueBox } = this.state;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 8 }, xl: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 }, xl: { span: 14 } }
        };
        return (
            <Drawer
                title={<FormattedMessage id='outComming.drawerAssigment.title' />}
                placement="right"
                width={isMobile ? "100%" : "50%"}
                closable={true}
                onClose={(e) => {
                    this.setState({
                        // isFirstTime: true
                        palletsResult: '',
                        boxesResult: 0,
                        iValuePallet: 0,
                        iValueBox: 0,
                    })
                    this.props.onClose(e, this)
                }}
                visible={this.props.visible}
            >
                <Form {...formItemLayout} style={{ marginTop: "5rem" }}>
                    <Form.Item label={<FormattedMessage id='outComming.drawerAssigment.pallets-availables' />}>
                        <Text>{pallets}</Text>
                    </Form.Item>
                    <Form.Item label={<FormattedMessage id='outComming.drawerAssigment.boxes-availables' />}>
                        <Text>{box}</Text>
                    </Form.Item>
                    <Form.Item label={<FormattedMessage id='outComming.drawerAssigment.pallets' />}>
                        <InputNumber min={0} max={pallets}  value={iValuePallet} onChange={(e) => { this.onChangeQuantityPallet(e, this) }} />
                    </Form.Item>
                    <Form.Item label={<FormattedMessage id='outComming.drawerAssigment.boxes' />}>
                        <InputNumber min={0}  max={box} value={iValueBox} onChange={(e) => { this.onChangeQuantityBox(e, this) }} />
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
                        <Button onClick={(e) => {
                            this.setState({
                                // isFirstTime: true
                                palletsResult: '',
                                boxesResult: 0,
                                iValuePallet: 0,
                                iValueBox: 0,
                            })
                            this.props.onClose((e, this))
                        }} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id='outComming.drawerAssigment.cancel' />
                        </Button>
                        <Button onClick={() => { this.onAccept(this) }} type="primary">
                            <FormattedMessage id='outComming.drawerAssigment.accept' />
                        </Button>
                    </div>
                </Form>
            </Drawer>
        );
    }
}