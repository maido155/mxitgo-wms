import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from './RangePickerOutcomming';
import RadioGroupComponent from './RadioGroupOutcomming';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutComming from './TabsOutComming';
import moment from 'moment';

import { Card, Form, Row, Col, DatePicker, Menu, Dropdown, Button, message, Tooltip, Divider,  Spin } from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import RangePickerOutcomming from './RangePickerOutcomming';
import RadioGroupOutcomming from './RadioGroupOutcomming';

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
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday){
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
    datesOutcomming:outcomming.datesOutcomming,
    datesProductAll: programming.datesProductAll,
    datesCustomerAll: programming.datesCustomerAll
}))
export default class OutComming extends PureComponent {
    state = {
        product : "",
        productDesc: "Product",
        customer: "",
        customerDesc: "Customer",
        dateFrom:"",
        dateTo:""
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
                 Authorization: sessionStorage.getItem('idToken')
                }
             },
        });

        this.props.dispatch({
            type: 'outcomming/getOutcomming',
            payload: { Product: "PRODUCT-1",Customer: "CUSTOMER-2", DateFrom: "2020-06-25T00:00:00.000Z", DateTo: "2020-06-30T00:00:00.000Z"}
        })
        
    };

    onChangeProd=(value)=>{
        console.log(value);

    }

    isEmpty=(str)=>{
        return (!str || 0 === str.length); 
    }
    onChangeWeek=(date,dateString)=>{

        var since = moment(dateString);
        var until = moment(dateString);
        until.add(6, 'days');
        let dateFrom = "";
        let dateTo = "";

        if (date !== null) {
            dateFrom= `${since.format("YYYY-MM-DD")}T00:00:00.000Z`; //date[0].toISOString();
            dateTo= `${until.format("YYYY-MM-DD")}T00:00:00.000Z`;
        } else {
            dateFrom = '';
            dateTo = '';
        }
        

        this.setState({
            dateFrom,dateTo
        })

        if( !this.isEmpty(dateFrom) && !this.isEmpty(dateFrom) && !this.isEmpty(this.state.product) && !this.isEmpty(this.state.customer)){
            
            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: this.state.product,Customer: this.state.customer, DateFrom: dateFrom, DateTo: dateTo}
            });
        }

    };

    onConfirm = (id) => {
         
        this.props.dispatch({
            type: 'outcomming/confirmOutcomming',
            payload: {SK: id, operation: "UPDATE_STATUS", status: "CONFIRMED"}
        })

    };

    handleProduct= (e)=> {
        //message.info('Click on menu item.');
        //console.log('click', e);
        // let productName = e.key;
        this.setState({
            product:e.key,
            productDesc: e.item.props.children
        })
        console.log(e);
        if( !this.isEmpty(e) && !this.isEmpty(this.state.customer) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)){

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: e.key,Customer: this.state.customer, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo}
            });
        }
      };

      handleClient= (e)=> {
        console.log(e);
        this.setState({
            customer:e.key,
            customerDesc: e.item.props.children
        })
        if( !this.isEmpty(e) && !this.isEmpty(this.state.product) && !this.isEmpty(this.state.dateTo) && !this.isEmpty(this.state.dateFrom)){

            this.props.dispatch({
                type: 'outcomming/getOutcomming',
                payload: { Product: this.state.product,Customer: e.key, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo}
            });
        }
      };

onShowCompositionData = (id) => {
         
        this.props.dispatch({  
            type: 'outcomming/getComposition',  
            payload: {PK: id}
        }); 

    };


    render() {
        console.log('Context--->', this);  
        console.log(this.props);
        let { datesProductAll, datesCustomerAll} = this.props;
        let {compositionData, datesOutcomming} = this.props.outcomming;

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };

        
        const menuProduct = (
            <Menu onClick={(e)=>{this.handleProduct(e,this)}}>

                {datesProductAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.productName}</Menu.Item>))}

            </Menu>
          );

          const menuClient = (
            <Menu onClick={(e)=>{this.handleClient(e,this)}} >
                {datesCustomerAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.clientName}</Menu.Item>))}
            </Menu>
          );

        

        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                        <Row>
                            <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                <Form.Item label={formatMessage({id: "general.calendar.week"})}>
                                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} onChange={(date,dateString)=>{this.onChangeWeek(date,dateString,this)}}/>
                                </Form.Item>
                            </Col>
                            <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                        </Row>


                            <Row type="flex" justify="center">
                               <Col xs={24} sm={23} md={2} lg={2} xl={2}  >
                                    <Form.Item>
                                        <Dropdown onChange={this.onChangeProd} overlay={menuProduct}>
                                            <Button>
                                                {this.state.productDesc} <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                </Col>
                               <Col xs={24} sm={23} md={1} lg={1} xl={1}  >
                               </Col>
                                <Col  xs={24} sm={23} md={2} lg={2} xl={2} >
                                    <Form.Item>
                                            <Form.Item>
                                                <Dropdown overlay={menuClient}>
                                                    <Button>
                                                    {this.state.customerDesc} <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                            
                                
                                            </Form.Item>
                                    </Form.Item>  
                                </Col>
                            </Row>

                            
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <TableOutComming datesOutcomming = {datesOutcomming} onConfirm = {this.onConfirm} loading = {this.props.loading} compositionData={compositionData} onShowCompositionData = {this.onShowCompositionData}/>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}