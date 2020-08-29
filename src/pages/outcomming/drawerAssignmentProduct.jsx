import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button, Form, InputNumber, Input } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { isMobile } from 'react-device-detect';
import { Typography } from 'antd';

const { Text } = Typography;

export default class DrawerAssignmentProduct extends PureComponent {
    state = {
        pallets: 0,
        box: 0,
        currentValuePallet: 0,
        currentValueBox: 0,
        isFirst: true
    }

    onChangeQuantityPallet = (e) => {
        let quantityBoxes = this.handleChangePallet();
        this.props.datesProductAll;
        let remaingQtyPallet = this.state.originalPallets;
        var remaingQtyBox = this.state.originalBox;
        var currentValuePallet = e;

        if (e === 0) {
            remaingQtyPallet;
            currentValuePallet = 0;
        } else {
            remaingQtyPallet = remaingQtyPallet - currentValuePallet;

            // Box - Updated Value
            remaingQtyBox = remaingQtyBox - (quantityBoxes * currentValuePallet);

            if (Math.sign(remaingQtyPallet) === -1) {
                remaingQtyPallet = 0;
                remaingQtyBox = 0;
            }
        }

        this.setState({
            pallets: remaingQtyPallet,
            currentValueBox: quantityBoxes * currentValuePallet,
            box: remaingQtyBox,
            currentValuePallet: currentValuePallet
        });
    }

    onChangeQuantityBox = (e) => {
        var remaingQtyBox = this.state.originalBox;
        let quantityBoxes = this.handleChangePallet();
        let remaingQtyPallet = this.state.originalPallets;
        var currentValuePallet = this.state.originalPallets;

        var currentValueBox = e;

        if (e === 0) {
            remaingQtyBox;
            currentValueBox = 0;
        } else {
            currentValuePallet = Math.ceil(currentValueBox / quantityBoxes);
            remaingQtyPallet = remaingQtyPallet - currentValuePallet;
            remaingQtyBox = remaingQtyBox - e;

            if (Math.sign(remaingQtyBox) === -1) {
                remaingQtyPallet = 0;
                remaingQtyBox = 0;
            }
        }

        this.setState({
            pallets: remaingQtyPallet,
            box: remaingQtyBox,
            currentValueBox: currentValueBox,
            currentValuePallet: currentValuePallet
        });
    };

    handleChangePallet = () => {
        let currentProduct = this.props.currentOutcomming.product;
        var filteredItem = this.props.datesProductAll.filter((el) => {
            if (el.productName === currentProduct) return el;
        });
        return filteredItem[0].quantityBoxes;
    }

    onAccept = (_this) => {
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

        payload.key = _this.props.currentOutcomming.key;
        payload.date = _this.props.currentOutcomming.dayDate;
        payload.status = _this.props.currentOutcomming.status;
        payload.skProduct = _this.props.currentOutcomming.skProduct;
        payload.skCustomer = _this.props.currentOutcomming.skCustomer;
        payload.skShipping = _this.props.currentShipping.shipment;
        payload.box = _this.state.currentValueBox;
        payload.pallet = _this.state.currentValuePallet;

        _this.props.postOutcomming(payload);
        _this.props.onClose();
    }

    setCurrentValues = () => {
        if (this.props.visible) {
            if (this.state.isFirst) {
                this.setState({
                    pallets: this.props.currentShipping.availables_pallets,
                    box: this.props.currentShipping.availables_boxes,
                    originalPallets: this.props.currentShipping.availables_pallets,
                    originalBox: this.props.currentShipping.availables_boxes,
                    isFirst: false
                });
            }
        } else {
            this.setState({
                currentValuePallet: 0,
                currentValueBox: 0,
                isFirst: true
            });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 8 }, xl: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 }, xl: { span: 14 } }
        };
        return (
            <Drawer
                title={'Asignación'}
                placement="right"
                width={isMobile ? "100%" : "50%"}
                closable={true}
                onClose={this.props.onClose}
                visible={this.props.visible}
                afterVisibleChange={this.setCurrentValues()}
                getContainer={isMobile ? false : true}
            >
                <Form {...formItemLayout} style={{ marginTop: "5rem" }}>
                    <Form.Item label={formatMessage({ id: "outComming.label.assignproduct-pallets-di" })}>
                        <Text>{this.state.pallets}</Text>
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: "outComming.label.assignproduct-boxes-di" })}>
                        <Text>{this.state.box}</Text>
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: "outComming.label.assignproduct-pallets" })}>
                        <InputNumber min={0} value={this.state.currentValuePallet} onChange={(e) => { this.onChangeQuantityPallet(e, this) }} />
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: "outComming.label.assignproduct-boxes" })}>
                        <InputNumber min={0} value={this.state.currentValueBox} onChange={(e) => { this.onChangeQuantityBox(e, this) }} />
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
                        <Button onClick={this.props.onClose} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id="outComming.button.cancel-assignment-outcomming" />
                        </Button>
                        <Button onClick={() => { this.onAccept(this) }} type="primary">
                            <FormattedMessage id="outComming.button.ok-assignment-outcomming" />
                        </Button>
                    </div>
                </Form>
            </Drawer>
        );
    }
}