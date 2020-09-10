import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

import { Card, Form, Row, Col, DatePicker, Menu, Dropdown, Button, notification, Select, Divider, Spin } from 'antd';
import TableOutComming from './TableOutComming';
import FilterFormOutcoming from './FilterFormOutcoming';
import AssignmentOutComming from './AssignmentOutComming';
import CompositionOutComming from './CompositionOutComming';
import { connect } from 'dva';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

@connect(({ outcomming, loading }) => ({
    outcomming,
    loading: loading.models.outcomming,
    datesOutcomming: outcomming.datesOutcomming,
    datesProductAll: outcomming.datesProductAll,
    datesCustomerAll: outcomming.datesCustomerAll,
    dataOutcommingsByEntry: outcomming.dataOutcommingsByEntry
}))
export default class OutComming extends PureComponent {
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
        currentShipping: {}, //Current Shipping for Assign
        currentOutbound: {}, //Current Selected Item from Table Outbound
        outboundKey: "", //Current Outbound Key
        disabledReset: false
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'outcomming/fetchProductAll',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    type: "Primary"
                }
            },
        });
    }
    

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
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    Product: this.state.product,
                    Customer: this.state.customer,
                    DateFrom: dateFrom,
                    DateTo: dateTo
                }
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

    handleProduct = (value, key) => {
        //message.info('Click on menu item.');
        //console.log('click', e);
        // let productName = e.key;
        this.setState({
            product: value,
            productDesc: key.props.children
        })
        //console.log(e);
        if (!this.isEmpty(value) && !this.isEmpty(this.state.customer) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)) {

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    Product: value,
                    Customer: this.state.customer,
                    DateFrom: this.state.dateFrom,
                    DateTo: this.state.dateTo
                }
            });
        }
    };

    handleClient = (value, key) => {
        this.setState({
            customer: value,
            customerDesc: key.props.children
        })
        if (!this.isEmpty(value) && !this.isEmpty(this.state.product) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)) {

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    Product: this.state.product,
                    Customer: value,
                    DateFrom: this.state.dateFrom,
                    DateTo: this.state.dateTo
                }
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
        this.setState({ disabledReset: true})
        this.props.dispatch({
            type: 'outcomming/postOutcomming',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
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
                    Customer: payload.skCustomer, //for getOutcomming
                    productKey: payload.skProduct //for getOCvsSH
                }
            }
        });
    };

    restartOutcomming = (key, context) => {
        this.setState({ disabledReset: false})
        console.log("1212");
        console.log("1212");
        console.log("1212");
        this.props.dispatch({
            type: 'outcomming/restartOutcomming',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    key: key,
                    Product: context.state.product,
                    Customer: context.state.customer,
                    DateFrom: context.state.dateFrom,
                    DateTo: context.state.dateTo,
                    productKey: context.state.product
                }
            }
        });
    }

    getOutcommingByEntry = (key, productKey) => {
        this.props.dispatch({
            type: 'outcomming/getOutcommingsByEntry',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    idOutcomming: key,
                    productKey: productKey
                }
            },
        });
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

    setDrawerAssignProduct = (record) => {
        this.setState({
            currentShipping: record,
            visibleAssignProduct: true
        })
    };

    onCloseDrawerAssigProduct = () => {
        this.setState({
            visibleAssignProduct: false
        })
    };

    showDrawerAssig = (item) => {
        console.log("assign")
        this.setVisibleAssign(true);
        this.setState({
          currentOutbound: item,
          outboundKey: item.key
        });
        
        this.getOutcommingByEntry(item.key,this.state.product);
    };

    onCloseDrawerAssig = () => {
        this.setVisibleAssign(false);
    };

    showDrawerCompo = (id, item) => {
        let oc = item.key;
        this.setState({
          currentOutbound: item,
          outboundKey: oc,
        });
        this.onShowCompositionData(id);
        this.setVisibleCompo(true);
    };

    onCloseDrawerCompo = () => {
        this.setVisibleCompo(false);
    };

    render() {
        console.log('Context--->', this);
        console.log(this.props);
        let { datesProductAll, datesCustomerAll } = this.props;
        let { compositionData, datesOutcomming, dataOutcommingsByEntry } = this.props.outcomming;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 }, md: { span: 6 }, lg: { span: 6 }, xl: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 18 }, md: { span: 18 }, lg: { span: 18 }, xl: { span: 18 } }
        };

        return (
                <PageHeaderWrapper extra=
                    {<FilterFormOutcoming
                        onChangeWeek={this.onChangeWeek}
                        handleProduct={this.handleProduct}
                        handleClient={this.handleClient}
                        datesProductAll={datesProductAll}
                        datesCustomerAll={datesCustomerAll}

                    />}>
                        <AssignmentOutComming 
                        loading = {this.props.loading}
                        productDesc = {this.state.productDesc}
                        datesProductAll = {datesProductAll}
                        visibleOne={this.state.visibleAssign}
                        currentOutcomming={this.state.currentOutbound}
                        closeOne={this.onCloseDrawerAssig}
                        postOutcomming= {(payload) => { this.postOutcomming(payload, this) }}
                        restartOutcomming= {(payload) => { this.restartOutcomming(payload, this) }}
                        recordKey= {this.state.outboundKey}
                        dataOutcommingsByEntry={dataOutcommingsByEntry}
                        productKey={this.state.product}

                        //Props for Assign Product Drawer
                        visibleAssignProduct={this.state.visibleAssignProduct} 
                        setVisibleAssignProduct={this.setVisibleAssignProduct} 
                        currentShipping={this.state.currentShipping}
                        onCloseDrawerAssigProduct={this.onCloseDrawerAssigProduct}
                        setDrawerAssignProduct={this.setDrawerAssignProduct}

                        disabledReset={this.state.disabledReset}
                />
                <CompositionOutComming
                    loading = {this.props.loading}
                    compositionData = {compositionData}
                    visibleTwo={this.state.visibleCompo}
                    closeTwo={this.onCloseDrawerCompo}

                    //Properties for drawer Assign
                    productKey={this.state.product}
                    productDesc = {this.state.productDesc}
                    datesProductAll = {datesProductAll}
                    currentOutcomming={this.state.currentOutbound}
                    postOutcomming= {(payload) => { this.postOutcomming(payload, this) }}
                    restartOutcomming= {(payload) => { this.restartOutcomming(payload, this) }}
                    recordKey= {this.state.outboundKey}
                    dataOutcommingsByEntry={dataOutcommingsByEntry}
                    getOutcommingByEntry={this.getOutcommingByEntry}

                    //Props for Assign Product Drawer
                    visibleAssignProduct={this.state.visibleAssignProduct} 
                    currentShipping={this.state.currentShipping}
                    onCloseDrawerAssigProduct={this.onCloseDrawerAssigProduct}
                    setDrawerAssignProduct={this.setDrawerAssignProduct}

                    disabledReset={this.state.disabledReset}
                />
                    <Card>
                        <Row type="flex" justify="center">
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <TableOutComming
                                    datesTableOutcomming={datesOutcomming}
                                    onConfirm={this.onConfirm}
                                    loading={this.props.loading}

                                    //Props for Show CompositionDrawer
                                    showDrawerCompo={this.showDrawerCompo}

                                    //Props for Show Assign Drawer
                                    showDrawerAssig={this.showDrawerAssig} />
                            </Col>
                        </Row>

                    </Card>
                </PageHeaderWrapper>
           

        );
    }
}