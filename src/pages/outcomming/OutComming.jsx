import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

import { Card, Form, Row, Col, DatePicker, Menu, Dropdown, Button, notification, Tooltip, Divider, Spin } from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function disabledDate(current) {
    mulInputs = {
        palletOne: 0,
        palletTwo: 0,
        palletThree: 0,
        palletFour: 0,
        palletFive: 0
    }
    sumInputs = {
        boxOne: 0,
        boxTwo: 0,
        boxThree: 0,
        boxFour: 0,
        boxFive: 0
    }
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
    if (dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday) {
        return true;
    }
}

var mulInputs = {
    palletOne: 0,
    palletTwo: 0,
    palletThree: 0,
    palletFour: 0,
    palletFive: 0
}
var sumInputs = {
    boxOne: 0,
    boxTwo: 0,
    boxThree: 0,
    boxFour: 0,
    boxFive: 0
}

@connect(({ outcomming, programming, loading }) => ({
    outcomming,
    programming,
    loading: loading.models.outcomming,
    datesOutcomming: outcomming.datesOutcomming,
    shippingsByEntry: outcomming.shippingsByEntry,
    datesProductAll: programming.datesProductAll,
    datesCustomerAll: programming.datesCustomerAll,
    dataOutcommingsByEntry: outcomming.dataOutcommingsByEntry
}))

class OutComming extends PureComponent {
    state = {
        product: "",
        productDesc: "Product",
        customer: "",
        customerDesc: "Customer",
        dateFrom: "",
        dateTo: "",
        visibleAssign: false, //flag for tableOutcooming
        visibleCompo: false, //flag for tableOutcooming
        visibleAssignProduct: false, //flag for Assign Product
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'programming/fetchCustomerAll',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken')
                }
            },
        });

        this.props.dispatch({
            type: 'programming/fetchProductAll',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    type: "Primary"
                }
            },
        });
    };

    isEmpty = (str) => {
        return (!str || 0 === str.length);
    }
    onChangeWeek = (date, dateString) => {

        var since = moment(dateString);
        var until = moment(dateString);
        until.add(6, 'days');
        let dateFrom = "";
        let dateTo = "";

        if (date !== null) {
            dateFrom = `${since.format("YYYY-MM-DD")}T00:00:00.000Z`; //date[0].toISOString();
            dateTo = `${until.format("YYYY-MM-DD")}T00:00:00.000Z`;
        } else {
            dateFrom = '';
            dateTo = '';
        }


        this.setState({
            dateFrom, dateTo
        })

        if (!this.isEmpty(dateFrom) && !this.isEmpty(dateFrom) && !this.isEmpty(this.state.product) && !this.isEmpty(this.state.customer)) {

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: this.state.product, Customer: this.state.customer, DateFrom: dateFrom, DateTo: dateTo }
            });
        }

    };

    onConfirm = (record) => {

        if (record.key !== "") {
            this.props.dispatch({
                type: 'outcomming/confirmOutcomming',
                payload: {
                    Product: this.state.product,
                    Customer: this.state.customer,
                    DateFrom: this.state.dateFrom,
                    DateTo: this.state.dateTo,
                    SK: record.key,
                    operation: "UPDATE_STATUS",
                    status: "CONFIRMED"
                }
            })
        }
        else {
            notification["info"]({
                message: "This option is not available",
                description: "Validation",
            });
        }



    };

    handleProduct = (e) => {
        //message.info('Click on menu item.');
        //console.log('click', e);
        // let productName = e.key;
        this.setState({
            product: e.key,
            productDesc: e.item.props.children
        })
        console.log(e);
        if (!this.isEmpty(e) && !this.isEmpty(this.state.customer) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)) {

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: e.key, Customer: this.state.customer, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo }
            });
        }
    };

    handleClient = (e) => {
        console.log(e);
        this.setState({
            customer: e.key,
            customerDesc: e.item.props.children
        })
        if (!this.isEmpty(e) && !this.isEmpty(this.state.product) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)) {

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: this.state.product, Customer: e.key, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo }
            });
        }
    };

    onShowCompositionData = (id) => {

        this.props.dispatch({
            type: 'outcomming/getComposition',
            payload: { PK: id }
        });

    };


    postOutcomming = (payload, context) => {

        this.props.dispatch({
            type: 'outcomming/postOutcomming',
            payload: {
                payload: {
                    key: payload.key,
                    date: payload.date,
                    status: payload.status,
                    skProduct: payload.skProduct,
                    skCustomer: payload.skCustomer,
                    assignSh: {
                        skShipping: payload.skShipping,
                        assignments: {
                            box: payload.box,
                            pallet: payload.pallet
                        }
                    },
                    DateFrom: context.state.dateFrom, //for getOutcomming
                    DateTo: context.state.dateTo, //for getOutcomming
                    Product: payload.skProduct, //for getOutcomming
                    Customer: payload.skCustomer //for getOutcomming
                }
            }
        });
    };

    restartOutcomming = (key, context) => {

        this.props.dispatch({
            type: 'outcomming/restartOutcomming',
            payload: {
                key: key,
                Product: context.state.product,
                Customer: context.state.customer,
                DateFrom: context.state.dateFrom,
                DateTo: context.state.dateTo
            }
        });
    }

    getOutcommingByEntry = (key, productKey) => {
        this.props.dispatch({
            type: 'outcomming/getOutcommingsByEntry',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken'),
                 idOutcomming : key,
                 productKey : productKey
                }
             },
        });
    }

    onChangeProd = (id) => {
        console.log(id)

    };

    setVisibleAssign = (value) => {
        this.setState({
            visibleAssign: value
        })
    };

    setVisibleCompo = (value) => {
        this.setState({
            visibleCompo: value
        })
    };

    setVisibleAssignProduct = (value) => {
        this.setState({
            visibleAssignProduct: value,
        })
    };

    render() {
        console.log('Context--->', this);
        console.log(this.props);
        let { datesProductAll, datesCustomerAll, shippingsByEntry } = this.props;
        let { compositionData, datesOutcomming, dataOutcommingsByEntry} = this.props.outcomming;
        console.log(shippingsByEntry);
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 }, md: { span: 6 }, lg: { span: 6 }, xl: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 18 }, md: { span: 18 }, lg: { span: 18 }, xl: { span: 18 } }
        };


        const menuProduct = (
            <Menu onClick={(e) => { this.handleProduct(e, this) }}>

                {datesProductAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.productName}</Menu.Item>))}

            </Menu>
        );

        const menuClient = (
            <Menu onClick={(e) => { this.handleClient(e, this) }} >
                {datesCustomerAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.clientName}</Menu.Item>))}
            </Menu>
        );



        return (
            <PageHeaderWrapper>
                <Card>
                    <Form layout="inline">
                        <Row style={{ padding: "1rem" }} type="flex" justify="center">
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={formatMessage({ id: "general.calendar.week" })}>
                                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} onChange={(date, dateString) => { this.onChangeWeek(date, dateString, this) }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item >
                                    <Dropdown onChange={(date, dateString) => { this.onChangeProd(e) }} overlay={menuProduct}>
                                        <Button>
                                            {this.state.productDesc} <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item style={{ width: "100%" }}>
                                    <Dropdown style={{ width: "100%" }} overlay={menuClient}>
                                        <Button style={{ width: "100%" }}>
                                            {this.state.customerDesc} <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <TableOutComming 
                                productDesc={this.state.productDesc} 
                                productKey={this.state.product} 
                                visibleAssignProduct={this.state.visibleAssignProduct} 
                                setVisibleAssignProduct={this.setVisibleAssignProduct} 
                                visibleAssign={this.state.visibleAssign} 
                                setVisibleAssign={this.setVisibleAssign} 
                                visibleCompo={this.state.visibleCompo} 
                                setVisibleCompo={this.setVisibleCompo} 
                                restartOutcomming={(payload) => { this.restartOutcomming(payload, this) }} 
                                postOutcomming={(payload) => { this.postOutcomming(payload, this) }} 
                                datesProductAll={datesProductAll} 
                                datesOutcomming={datesOutcomming} 
                                onConfirm={this.onConfirm} 
                                loading={this.props.loading} 
                                compositionData={compositionData} 
                                onShowCompositionData={this.onShowCompositionData} 
                                getOutcommingByEntry={this.getOutcommingByEntry}
                                dataOutcommingsByEntry={dataOutcommingsByEntry}/>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default OutComming;