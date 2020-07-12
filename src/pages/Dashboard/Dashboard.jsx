import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { Row, Col, Card, Divider, Form } from 'antd';
import { isMobile, isTablet } from "react-device-detect";
import { formatMessage } from 'umi-plugin-react/locale';
import 'moment/locale/en-au';
import GridDashboard from './GridDashboard';




@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.models.dashboard,
  currentSelectedDate: dashboard.currentSelectedDate,
  currentSelectedProduct: dashboard.currentSelectedProduct
}))



export default class Dashboard extends PureComponent {

  componentDidMount() {

    
  }

  state = {
    currentSelectedDate : "2020-07-08",
    currentSelectedProduct: "PRODUCT-2",
    currentCustomer : "CUSTOMER-1",
    products: ["PRODUCT-1", "PRODUCT-2"]
  };

  selectionMade = (product, customer, startDate) => {
    
    this.props.dispatch({
      type: 'dashboard/getWeekProgrammingTotals',
      payload: {
        product,
        customer,
        startDate,
        Authorization: sessionStorage.getItem('idToken')
      }
    });


    this.props.dispatch({
      type: 'dashboard/dashboardGetMasterTotal',
      payload: {
        startDate,
        customer,
        products: this.state.products
      }
    })

  };

  onPickerChange = (oEvent) => {

      /// Get current product selection
      /// Customer hardcoded
      //PRODUCT-2|CUSTOMER-1

      this.setState({currentSelectedDate: oEvent[0].format("YYYY-MM-DD")})

      this.selectionMade(this.state.currentSelectedProduct, this.state.currentCustomer, oEvent[0].format("YYYY-MM-DD"));

      

  }


  onRadioChange  = (oEvent) => {

      this.setState({currentSelectedProduct: oEvent.target.value})

      this.selectionMade(oEvent.target.value, this.state.currentCustomer, this.state.currentSelectedDate);

  }

  render() {
    if (isMobile) {
      return (
        <PageHeaderWrapper>
          <Card>
            <div>
              <Row type="flex" justify="center">
                <Col span={24} style={{ textAlign: "center" }}>
                  <h3>Semana:</h3>
                </Col>
                <Col span={24} >
                  <RangePickerComponent onChange={this.onPickerChange}/>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <Row type="flex" justify="right">
                <Col span={5} style={{ textAlign: "center" }}>
                </Col>
                <Col span={15} style={{ textAlign: "center", margin: "1rem" }}>
                  <RadioGroupComponent  onChange={this.onRadioChange}/>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <GridDashboard  programmingTotal = {this.props.dashboard.programmingTotal}  programmingTotalPRODUCT1={this.props.dashboard.programmingTotalPRODUCT1} programmingTotalPRODUCT2={this.props.dashboard.programmingTotalPRODUCT2} xs={12} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} dataTwo={3} dataThree={3} dataFour={3} dataFive={130} dataSix={200} dataSeven={15} />
            </div>
          </Card>
        </PageHeaderWrapper>
      );
    }
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 9 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 9 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <Form {...formItemLayout}>
            <div>
              <Row type="flex" justify="space-between">
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  <Form.Item label="Semana:">
                    <RangePickerComponent onChange={this.onPickerChange}/>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                  <Form.Item label="">
                    <RadioGroupComponent onChange={this.onRadioChange}/>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />

          </Form>
          <div>
            <GridDashboard programmingTotal = {this.props.dashboard.programmingTotal} programmingTotalPRODUCT1={this.props.dashboard.programmingTotalPRODUCT1} programmingTotalPRODUCT2={this.props.dashboard.programmingTotalPRODUCT2} xs={24} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} dataTwo={3} dataThree={4} dataFour={2} dataFive={150} dataSix={200} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
