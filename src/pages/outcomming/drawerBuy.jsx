import React, { PureComponent } from 'react';
import { Drawer, Form, Input, InputNumber, Row, Col, Button, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { isMobile } from 'react-device-detect';

const { TextArea } = Input;

const DrawerBuy = Form.create()(
    class extends PureComponent {
        handleSubmit = e => {
            e.preventDefault();
            const { boxesRequired, datesOutcomming, currentOutcomming, shipment, postOutcomming, onCloseVisibleBuy } = this.props;
            this.props.form.validateFields((err, values) => {
                if (err) {
                    return;
                }

                let getOutComming = datesOutcomming.filter(function(data){
                    return data.dayDate === currentOutcomming.dayDate;
                })

                let numSum = parseInt(getOutComming[0].assignedBox) + values.boxes;
                if(numSum > parseInt(boxesRequired)){
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

                payload.key = getOutComming[0].key;
                payload.date = currentOutcomming.dayDate;
                payload.status = currentOutcomming.status;
                payload.skProduct = currentOutcomming.skProduct;
                payload.skCustomer = currentOutcomming.skCustomer;
                payload.skShipping = 'SH-DIRECTSALE';
                payload.box = values.boxes;
                payload.pallet = 1;
                payload.comment = values.comments
                payload.buy = true;
                postOutcomming(payload);
                onCloseVisibleBuy();
                this.props.form.resetFields();

            })

        }
        render(){
            const { onCloseVisibleBuy, visibleBuy, form } = this.props;
            const { getFieldDecorator } = form;
            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 }, lg: { span: 9}, xl: { span: 7 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 25 }, md: { span: 24 }, lg: { span: 15 }, xl: { span: 17 } }
            };
            return(
                <>
                    <Drawer
                        title={formatMessage({ id: 'outComming.button.assignment-outcomming-sale-floor' })}
                        placement="right"
                        width={isMobile ? "100%" : "30%"}
                        closable={true}
                        onClose={onCloseVisibleBuy}
                        visible={visibleBuy}
                    >
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Row justify="center">
                                <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                                    <Form.Item label={formatMessage({ id: 'outComming.button.assignment-outcomming-sale-boxes' })}>
                                        {getFieldDecorator('boxes')(<InputNumber style={{width: '100%'}}/>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                                    <Form.Item label={formatMessage({ id: 'outComming.button.assignment-outcomming-sale-comme' })}>
                                        {getFieldDecorator('comments')(<TextArea/>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    borderTop: '1px solid #e8e8e8',
                                    padding: '10px 16px',
                                    textAlign: 'right',
                                    left: 0,
                                    background: '#fff',
                                    borderRadius: '0 0 4px 4px',
                                }}
                            >
                                <Button onClick={onCloseVisibleBuy} style={{marginRight: '.5rem'}}>
                                    <FormattedMessage id="outComming.button.close-assignment-outcomming" />
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    <FormattedMessage id="outComming.label.tableassignment-assign" />
                                </Button>
                            </div>
                        </Form>
                    </Drawer>
                </>
            )
        }
    }
)

export default DrawerBuy;