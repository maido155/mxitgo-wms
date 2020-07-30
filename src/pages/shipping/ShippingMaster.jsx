import React, { PureComponent } from 'react';
import Styles from './StylesShipping.css';
import { Card, Button, Icon, Form, Row, Col, Divider, Spin, DatePicker } from 'antd';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import TableShippingMaster from './TableShippingMaster';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DrawerShippingPrograming from './DrawerShippingPrograming';
import { formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';


function disabledDate(current) {
    let dateMonday = moment(current).isoWeekday(1);
    let dateThursday = moment(current).isoWeekday(2);
    let dateTuesday = moment(current).isoWeekday(4);
    let dateFriday = moment(current).isoWeekday(5);
    let dateSaturday = moment(current).isoWeekday(6);
    let dateSunday = moment(current).isoWeekday(7);
    let dateAll = moment(current).format('dddd DD MMMM');
    let compareMonday = moment(dateMonday).format('dddd DD MMMM');
    let compareThursday = moment(dateThursday).format('dddd DD MMMM');
    let compareTuesday = moment(dateTuesday).format('dddd DD MMMM');
    let compareFriday = moment(dateFriday).format('dddd DD MMMM');
    let compareSaturday = moment(dateSaturday).format('dddd DD MMMM');
    let compareSunday = moment(dateSunday).format('dddd DD MMMM');
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday){
        return true;
    }
}

@connect(({ shipping, loading }) => ({
    shipping,
    loading: loading.models.shipping,
    warehouses: shipping.warehouses,
    isSuccess: shipping.isSuccess,
    close: shipping.close,
    datesShipping: shipping.datesShipping,
    productsAll: shipping.productsAll
}))


class ShippingMaster extends PureComponent {
    state = {
        visibleShippingPrograming: false,
        visibleNewLine: false,

        lineData: {},
        masterMode: "NEW",
        lineMode: "NEW"


    }

    componentDidMount() {

        this.props.dispatch({
            type: 'shipping/getLocations',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
            },
        }); 

    //    this.props.dispatch({
    //         type: 'shipping/getShippingAll',
    //         payload: {
    //             payload: {
    //              Authorization: sessionStorage.getItem('idToken'),
    //              initialDate: "2020-07-29"
    //             }
    //         },
    //     });

        this.props.dispatch({
            type: 'shipping/getProducts',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
            },
        });


    }

    onChangeWeek=(date,dateString)=>{

        var since = moment(dateString);
        var until = moment(dateString);
        until.add(6, 'days');
        let dateFrom = "";

        if (date !== null) {
            dateFrom= `${since.format("YYYY-MM-DD")}`; //date[0].toISOString();
        } else {
            dateFrom = '';
        }
        
        this.setState({
            dateFrom
        })

        this.props.dispatch({
            type: 'shipping/getShippingAll',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken'),
                 initialDate: dateFrom
                }
            },
        });

    };


    showShippingPrograming = () => {


        // this.props.dispatch({
        //     type: 'shipping/setWarehouse',
        //     payload: { warehouses: [] }
        // })

        // this.props.dispatch({
        //     type: 'shipping/setShippingItem',
        //     payload: { oItem: { products: [], id: "" } }
        // })

        this.props.dispatch({
            type: 'shipping/resetValues',
            payload: { oItem: { products: [], id: "" } }
        })


        this.setState({
            visibleShippingPrograming: true,
            masterMode: "NEW"
        });
    };



    showShippingProgramingEdit = (oItem) => {


        this.props.dispatch({
            type: 'shipping/getShipping',
            payload: { id: oItem.id, status: "New" }
        })

        this.setState({
            visibleShippingPrograming: true,
            masterMode: "EDIT"
        })

        // var aWarehouseData = [];

        // for (var i = 0; i < oItem.products.length; i++) {
        //     var oLineItem = {};
        //     oItem.products[i].forEach((oProductItem) => {
        //         oLineItem[oProductItem.product] = oProductItem.amount;
        //     });
        //     oLineItem.center = oItem.center;
        //     aWarehouseData.push(oLineItem);
        // };

        // /// convert date properties to moment
        // oItem.departureDate = new moment(oItem.departureDate);
        // oItem.deliveryDate = new moment(oItem.deliveryDate);
        // oItem.entryDate = new moment(oItem.entryDate);

        // this.props.dispatch({
        //     type: 'shipping/setWarehouse',
        //     payload: { warehouses: aWarehouseData }
        // })
        // this.setState({
        //     visibleShippingPrograming: true,
        //     oShippingItem: oItem,
        //     masterMode: "EDIT"
        // });
    };




    onCloseShippingPrograming = () => {
        this.setState({
            visibleShippingPrograming: false
        });
    };
    showNewLine = (sLineStatus, record) => {
        // this.setState({ visibleNewLine: true });
        this.setState({ visibleNewLine: true, lineData: record, lineMode: sLineStatus });
    };
    onCloseNewLine = () => {
        this.setState({
            visibleNewLine: false
        });
    };
    insertWarehouse = (payload) => {
        this.props.dispatch({
            type: 'shipping/saveWarehouse',
            payload
        });
    }

    replaceWarehouse = (payload) => {
        this.props.dispatch({
            type: 'shipping/replaceWarehouse',
            payload
        });
    }



    saveShipping = (datesShipping) => {

        if (this.state.masterMode == "NEW") {

            this.props.dispatch({
                type: 'shipping/saveShipping',
                payload: {
                    payload: {
                        POST: {
                            typeCondition: "New",
                            isMasterModified: true,
                            comment: datesShipping.comment,
                            createdBy: datesShipping.createdBy,
                            date: datesShipping.date,
                            departureDate: datesShipping.departureDate,
                            deliveryDate: datesShipping.deliveryDate,
                            entryDate: datesShipping.entryDate,
                            destination: datesShipping.destination,
                            products: datesShipping.products,
                            skWh: datesShipping.warehouses,
                            dateNew: datesShipping.dateNew,
                            createdByNew: datesShipping.createdByNew,
                            idShipping: datesShipping.idShipping,
                            Authorization: sessionStorage.getItem('idToken')
                        }
                    }
                }
            });

        } else {

            this.props.dispatch({
                type: 'shipping/updateShipping',
                payload: {
                    typeCondition: "New",
                    isMasterModified: true,
                    comment: datesShipping.comment,
                    createdBy: datesShipping.createdBy,
                    date: datesShipping.date,
                    departureDate: datesShipping.departureDate,
                    deliveryDate: datesShipping.deliveryDate,
                    entryDate: datesShipping.entryDate,
                    destination: datesShipping.destination,
                    products: datesShipping.products,
                    skWh: datesShipping.warehouses,
                    dateNew: datesShipping.dateNew,
                    createdByNew: datesShipping.createdByNew,
                    idShipping: datesShipping.idShipping,
                    Authorization: sessionStorage.getItem('idToken')
                }
            })

        }





    }
    changedSuccess = () => {
        this.props.dispatch({
            type: 'shipping/changedSuccess',
            payload: {}
        })
    }



    updateShippingSuccess = () => {
        this.props.dispatch({
            type: 'shipping/updatedSuccess',
            payload: {}
        })
    }

    changedClose = () => {
        this.props.dispatch({
            type: 'shipping/changedClose',
            payload: {}
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 7 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 5 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
        };
        const { loading, isSuccess, close, datesShipping, productsAll } = this.props;
        const { oShippingItem, warehouses, warehouseIds, products, locationTreeData } = this.props.shipping;


        return (
            <div>
                <DrawerShippingPrograming

                    masterMode={this.state.masterMode}
                    lineMode={this.state.lineMode}

                    visibleShippingPrograming={this.state.visibleShippingPrograming}
                    oShippingItem={oShippingItem}

                    onCloseShippingPrograming={this.onCloseShippingPrograming}
                    visibleNewLine={this.state.visibleNewLine}
                    onCloseNewLine={this.onCloseNewLine}
                    showNewLine={this.showNewLine}
                    lineData={this.state.lineData}
                    insertWarehouse={this.insertWarehouse}
                    replaceWarehouse={this.replaceWarehouse}

                    warehouses={warehouses}
                    warehouseIds={warehouseIds}

                    saveShipping={this.saveShipping}
                    loading={loading}
                    isSuccess={isSuccess}
                    changedSuccess={this.changedSuccess}
                    close={close}
                    changedClose={this.changedClose}
                    products={products}
                    updateShippingSuccess={this.updateShippingSuccess}
                    locationTreeData={locationTreeData}

                    productsAll={productsAll}

                />
                <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                <Form.Item label={formatMessage({id: "outComming.label.week"})}>
                                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} onChange={(date,dateString)=>{this.onChangeWeek(date,dateString,this)}}/>
                                </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Divider />
                        <Row>
                            <Col span={22} className={Styles.addshippingmaster}>
                                <Button type="primary" shape="circle" size="large" onClick={this.showShippingPrograming}>
                                    <Icon type="plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Spin tip={"Cargando..."} spinning={loading}>
                                <TableShippingMaster
                                    showShippingProgramingEdit={this.showShippingProgramingEdit}
                                    datesTableShipping={datesShipping}
                                />
                            </Spin>
                            </Col>
                        </Row>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default ShippingMaster;