import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal, Row, Col, Typography, Spin  } from 'antd';
import Styles from './StylesGeneral.css';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const { Text } = Typography;

export default class ModalProductTable extends PureComponent{
    state = {
        currentLoader: false,
    }  
    faltante =(confirmed,planned)=>{
    let faltante = planned-confirmed;
    console.log(faltante);    
    return (faltante)
   }
    render(){
        const { oShippingItem} = this.props;
        let deliveryDate = moment(oShippingItem.deliveryDate).format('dddd');
        console.log(deliveryDate);
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        this.setState({ currentLoader });
        return(
            <div>
                <Modal
                    title={formatMessage({id: "shipping.modal.detail-table.title"})}
                    visible={this.props.visibleModalProduct}
                    onOk={this.props.onCloseModalProduct}
                    onCancel={this.props.onCloseModalProduct}
                    width={"40%"}
                >
                    <Spin spinning={this.state.currentLoader}>
                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.shipping"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={10} className={Styles.labeltwo}>
                        <Text>{oShippingItem['WMS-1-PK']}</Text>
                        </Col>
                        <Col md={1} lg={3} ></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.day"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>{deliveryDate}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.product"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>{oShippingItem.products.length === 0 ? "0" : oShippingItem.products[0].productName}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.planned"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>{oShippingItem.products.length == 0 ? "0" : oShippingItem.products[0].planned}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.confirmed"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>{oShippingItem.products.length == 0 ? "0" : oShippingItem.products[0].confirmed}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text strong>{formatMessage({id: "shipping.modal.detail-table.entry"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                            <Text>{oShippingItem.products.length === 0 ? "0" : oShippingItem.products[0].entry}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={1} md={3} lg={6} xl={7}></Col>
                        <Col xs={24} sm={8} md={6} lg={5} xl={7} className={Styles.labelone}>
                            <Text type="danger" strong>{formatMessage({id: "shipping.modal.detail-table.missing"})}</Text>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={8} xl={6} className={Styles.labeltwo}>
                        <Text type="danger">{this.faltante(oShippingItem.products.length === 0 ? "0" : oShippingItem.products[0].confirmed,oShippingItem.products.length == 0 ? "0" : oShippingItem.products[0].planned)}</Text>
                        </Col>
                        <Col md={1} lg={3} xl={4}></Col>
                    </Row>
                    </Spin>
                </Modal>
            </div>
        );
    }
}