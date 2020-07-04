import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from './RangePickerOutcomming';
import RadioGroupComponent from './RadioGroupOutcomming';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutComming from './TabsOutComming';
import moment from 'moment';

import { Card, Form, Row, Col, Menu, Dropdown, Button, message, Tooltip, Divider,  Spin } from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import RangePickerOutcomming from './RangePickerOutcomming';
import RadioGroupOutcomming from './RadioGroupOutcomming';


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
        product : "PRODUCT-1",
        customer: "CUSTOMER-2",
        dateFrom:"2020-06-25T00:00:00.000Z",
        dateTo:"2020-06-30T00:00:00.000Z"
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

    onChangeWeek=(date,dateString)=>{

        let dateFrom= `${date[0].format("YYYY-MM-DD")}T00:00:00.000Z`; //date[0].toISOString();
        let dateTo= `${date[1].format("YYYY-MM-DD")}T00:00:00.000Z`;
        
        this.setState({
            dateFrom,dateTo
        })
        this.props.dispatch({
            type: 'outcomming/getOutcomming',
            payload: { Product: this.state.product,Customer: this.state.customer, DateFrom: dateFrom, DateTo: dateTo}
        });

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
        console.log(e);
        this.setState({
            product:e.key
        })

        this.props.dispatch({
            type: 'outcomming/getOutcomming',
            payload: { Product: e.key,Customer: this.state.customer, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo}
        });

      };
      handleClient= (e)=> {
        console.log(e);
        this.setState({
            customer:e.key
        })

        this.props.dispatch({
            type: 'outcomming/getOutcomming',
            payload: { Product: this.state.product,Customer: e.key, DateFrom: this.state.dateFrom, DateTo: this.state.dateTo}
        });
      };

onShowCompositionData = (id) => {
         
        this.props.dispatch({  
            type: 'outcomming/getComposition',  
            payload: {PK: id}
        }); 

    };


    render() {
        console.log(this.props);
        let { datesProductAll, datesCustomerAll} = this.props;
        let {compositionData, datesOutcomming} = this.props.outcomming;

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };

        const menuProduct = (
            <Menu onClick={this.handleProduct}>

            {datesProductAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.productName}</Menu.Item>))}
              
            </Menu>
          );

          const menuClient = (
            <Menu onClick={this.handleClient}>

             {datesCustomerAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.clientName}</Menu.Item>))}

            </Menu>
          );

        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center"> 
                                <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.week' })}>
                                        <RangePickerOutcomming onChange={this.onChangeWeek}/>
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Row type="flex" justify="center">
                               <Col xs={24} sm={23} md={2} lg={2} xl={2}  >
                                    <Form.Item>
                                        <Dropdown onChange={this.onChangeProd} overlay={menuProduct}>
                                            <Button>
                                                Product <DownOutlined />
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
                                                        Client <DownOutlined />
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