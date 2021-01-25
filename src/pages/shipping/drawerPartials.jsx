import React, { PureComponent } from 'react';
import { Drawer, Icon, Table, Button, Row, Col, Typography, Form, Divider, Modal } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';
import DrawerProducts from './drawerEntryProducts';
import moment from 'moment';
import { connect } from 'dva';

const { Text } = Typography;

const { confirm } = Modal;

@connect(({ shipping, loading }) => ({
    shipping,
    loading: loading.models.shipping,
  
}))

class DrawerPartial extends PureComponent {
    state = {
        partialEdit: []
    }

    showTablePartial = ( values, typeProduct, partialEdit, typePartial ) => {

        const { insertpartialProducts } = this.props;

        if(typePartial === "new"){

            var dataFormated = [{
                entryProduct: values.entryProduct,
                temperatureProduct: values.temperatureProduct,
                urlImage: values.urlImage,
                typeProduct,
                dateToday: moment().format('LL'),
                idPartial: moment().format()
            }]

        }else{
            
            var dataFormated = [{
                entryProduct: values.entryProduct,
                temperatureProduct: values.temperatureProduct,
                urlImage: values.urlImage,
                typeProduct,
                dateToday: partialEdit[0].dateToday,
                idPartial: partialEdit[0].idPartial
            }]

        }

        insertpartialProducts(dataFormated, typePartial);
        

    }

    totalEntry = (partialProducts) => {

        let aNumber = partialProducts.map(function(data){
            return data.entryProduct
        })

        if(aNumber.length !== 0){
            var sum = aNumber.reduce(function(a, b){
                return a + b;
            })
        }

        return aNumber.length === 0 ? 0 : sum
    }

    funEditPartial = record => {
        const { showDrawerProducts, typeProduct } = this.props;
        this.setState({
            partialEdit: [record]
        })
        showDrawerProducts(typeProduct, 'edit');
    }

    modalDeletePartial = (data) => {
        let _self = this;
        confirm({
            title: formatMessage({ id: 'shipping.modal-delete-partial' }),
            okText: formatMessage({ id: 'shipping.modal-delete-yes' }),
            okType: 'danger',
            cancelText: formatMessage({ id: 'shipping.modal-delete-no' }),
            onOk(){
                _self.props.dispatch({
                    type: 'shipping/deletepartialModal',
                    payload: {
                        data
                    }
                })
            }, 
            onCancel() {
            },
        });
    }

    render(){
        const { closePartial, visiblePartial, typeProduct, quantities, oShippingItem, showDrawerProducts, visibleDrawer, onCancel, partialProducts, dataProduct, handleProductPar, typePartial} = this.props;

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 8 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 14 },xl: { span: 17  }}
        };

        let columns = [
            {
              title: formatMessage({ id: 'shipping.label.table-shipping-partial.date' }),
              dataIndex: 'dateToday',
              key: 'dateToday',
              width: isMobile ? 100 : 150,
            },
            {
              title: formatMessage({ id: 'shipping.label.table-shipping-partial.ammount' }),
              dataIndex: 'entryProduct',
              key: 'entryProduct',
              width: isMobile ? 100 : 100,
            },
            {
                title: formatMessage({ id: 'shipping.label.table-shipping-partial.action' }),
                key: 'action',
                fixed: 'right',
                width: isMobile ? 200 : oShippingItem.commentEntry != undefined ? 100 : 200,
                render: (record) => (
                    <>
                        { oShippingItem.commentEntry == undefined &&
                            <>
                                <Button type="link" style={{paddingRight: '1px', paddingLeft: '1px'}} onClick={() => {this.funEditPartial(record)}}>
                                    {isMobile
                                    ? <Icon type="edit" />
                                    : <><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></>
                                    }
                                </Button>
                                <Divider type="vertical"/>
                                <Button type="link" style={{paddingRight: '1px', paddingLeft: '1px'}} onClick={ () => { this.modalDeletePartial(record)}}>
                                    {isMobile
                                        ? <Icon type="delete"/>
                                        : <><Icon type="delete"/><FormattedMessage id="general.table.delete"/></>
                                    }
                                </Button>
                            </>
                        }
                        { oShippingItem.commentEntry != undefined &&
                            <Button type="link" style={{paddingRight: '1px', paddingLeft: '1px'}} onClick={() => {this.funEditPartial(record)}}>
                                {isMobile
                                ? <Icon type="eye" />
                                : <><Icon type="eye" /> <FormattedMessage id="shipping.label.table-shipping.show" /></>
                                }
                            </Button>
                        }
                    </>
                )
            }
        ]
        return (
            <Drawer
                title={formatMessage({ id: 'shipping.entryProducts.title.partial' })}
                width={isMobile ? "100%" : "40%"}
                onClose={closePartial}
                visible={visiblePartial}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form {...formItemLayout}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={formatMessage({ id: 'shipping.label.form-shipping.totalConf' })}>
                                <Text strong>{quantities}</Text>  
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={formatMessage({ id: 'shipping.label.form-shipping.totalPartial' })}>
                                <Text strong>{this.totalEntry(partialProducts)}</Text>  
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'right'}}>
                            { oShippingItem.commentEntry == undefined &&
                                <Button type="primary" shape="circle" size="large" onClick={() => { showDrawerProducts(typeProduct, 'new')}}>
                                    <Icon type="plus" />
                                </Button>
                            }
                            <DrawerProducts
                                visibleDrawer={visibleDrawer}
                                oShippingItem={oShippingItem}
                                onCancel={onCancel}
                                typeProduct={typeProduct}
                                quantities={quantities}
                                dataProduct={dataProduct}
                                showTablePartial={this.showTablePartial}
                                partialEdit={this.state.partialEdit}
                                typePartial={typePartial}
                                partialProducts={partialProducts}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '1rem'}}>
                            <Table size="small" rowKey="uid" columns={columns}  dataSource={partialProducts} scroll={isMobile ? { x: 1100 } : { x: 550 }} pagination={false} />
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
                        <Button onClick={closePartial} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id="shipping.button.cancel"/> 
                        </Button>
                        { oShippingItem == undefined || oShippingItem.commentEntry == undefined &&
                            <Button type="primary" onClick={() => {handleProductPar()}}>
                                <FormattedMessage id="shipping.entryProduct.button.progra"/>
                            </Button>
                        }
                    </div>

                </Form>
            </Drawer>
        )
    }
}

export default Form.create()(DrawerPartial);
