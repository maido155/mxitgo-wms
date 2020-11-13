import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectProduct from '../generalComponents/SelectProduct';
import { Row, Col, Card, Tooltip, Typography, Progress, Form, DatePicker, Statistic, Icon, Spin, notification } from 'antd';
import { isMobile, isTablet } from "react-device-detect";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import  StepsDashBoard from './Steps/StepsDashBoard';
import 'moment/locale/en-au';
import GridDashboard from './GridDashboard';
const { Text, Title } = Typography; 
function disabledDate (current) {
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




@connect(({ dashboard,programming,products, loading }) => ({
  dashboard,
  programming,
  products,
  loading: loading.models.dashboard,
  
  datesProductAll: programming.datesProductAll,
  currentSelectedDate: dashboard.currentSelectedDate,
  currentSelectedProduct: dashboard.currentSelectedProduct
}))



export default class Dashboard extends PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'products/getProducts',
      payload: {
          payload: {
           Authorization: sessionStorage.getItem('idToken'),
           type: "Primary"
          }
       },
    });
    this.props.dispatch({
      type: 'dashboard/init',
      payload: {
       },
    });
    
  }


   componentWillUnmount() {
    for (const product of this.state.products) { 
    this.props.dispatch({
       type: 'dashboard/getWeekProgrammingTotalsReset',
       payload: {
          product,
          Authorization: sessionStorage.getItem('idToken')
       }
     });
    }
     this.props.dispatch({
       type: 'dashboard/dashboardGetMasterTotalReset',
       payload: {
          products: this.state.products,
          Authorization: sessionStorage.getItem('idToken')
       }
     });

     var startDate = `2020-11-11T00:00:00.000Z`;



    ///////// Bring 7 days

    var currentDate = moment(startDate, "YYYY-MM-DD");
    var weekStart = currentDate;
    //var weekEnd = currentDate.add(6, 'days');
    var aDays = [0, 1, 2, 3, 4, 5, 6];

    //startDate=`${startDate}T00:00:00.000Z`;
    for (const i of aDays) {
     this.props.dispatch({
      type: 'dashboard/getDayReset',
      payload: {
        Authorization: sessionStorage.getItem('idToken'),
        dayName: moment(weekStart).add(i, 'days').format("dddd")
      }
    })
    }
   }

  state = {
    currentSelectedDate: "",
    currentSelectedProduct: "",
    currentSelectedProductDesc: "",
    currentCustomer: "CUSTOMER-2",
    products: ["PRODUCT-1", "PRODUCT-2"],

  };

  selectionProduct = (product, customer, startDate) => {

    if (product === "" || customer === "" || startDate === "") {
      notification["info"]({
        message: "This option is not available",
        description: "before continuing select a date",
      });
      return;
    }

    console.log("dashboard======")
    console.log(this.props.dashboard)
    if (product === "PRODUCT-2" && this.props.dashboard.programmingTotalPRODUCT2 === 0) {
      notification["info"]({
        message: "This option is not available",
        description: "Premium prodcut does not have requirement",
      });
      return;
    }

    if (product === "PRODUCT-1" && this.props.dashboard.programmingTotalPRODUCT1 === 0) {
      notification["info"]({
        message: "This option is not available",
        description: "Gold prodcut does not have requirement",
      });
      return;
    }

    startDate = `${startDate}T00:00:00.000Z`;



    ///////// Bring 7 days

    var currentDate = moment(startDate, "YYYY-MM-DD");
    var weekStart = currentDate;
    //var weekEnd = currentDate.add(6, 'days');
    var aDays = [0, 1, 2, 3, 4, 5, 6];

    //startDate=`${startDate}T00:00:00.000Z`;




    for (const i of aDays) {

      this.props.dispatch({
        type: 'dashboard/getDay',
        payload: {
          Authorization: sessionStorage.getItem('idToken'),
          startDate,
          customer,
          product,
          deliveryDate: `${moment(weekStart).add(i, 'days').format("YYYY-MM-DD")}T00:00:00.000Z`,
          dayName: moment(weekStart).add(i, 'days').format("dddd")
        }
      })

    }



  };


  getNumberDay = () => {
    var dt = new Date();
    let aWeek = [3, 4, 5, 6, 0, 1, 2];
    return aWeek.findIndex(item => item == dt.getDay())

  }

  getTotals = (startDate) => {
    if (startDate === "") return;

    startDate = `${startDate}T00:00:00.000Z`;

    for (const product of this.state.products) {
      this.props.dispatch({
        type: 'dashboard/getWeekProgrammingTotals',
        payload: {
          product,
          startDate,
          Authorization: sessionStorage.getItem('idToken')
        }
      });

    }



    this.props.dispatch({
      type: 'dashboard/dashboardGetMasterTotal',
      payload: {
        startDate,
        products: this.state.products,
        Authorization: sessionStorage.getItem('idToken')
      }
    });

  }



  onPickerChange = (oEvent) => {
    this.setState({ currentSelectedDate: oEvent.format("YYYY-MM-DD") },
      () => { this.getTotals(oEvent.format("YYYY-MM-DD")) }
    )
  }


  onProductChange = (value, key) => {

    this.setState(
      {
        currentSelectedProduct: value,
        currentSelectedProductDesc: key.props.children
      }, () => {

        console.log("handle product")
        console.log(value + " " + this.state.customer + " " + this.state.currentSelectedDate)
        this.selectionProduct(value, this.state.customer, this.state.currentSelectedDate);

      })



  }

  render() {

    let { datesProductAll,loading, products, dashboard} = this.props;
    console.log(products.productsAll);
    this.setState({loading});
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 9 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 9 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
    };

    return (
      <PageHeaderWrapper
        spin={this.state.loading}
        content={<div>
          <Spin spinning={this.state.loading}>
          <Card type="inner" size="small" style={{textAlign:"center"}}  title={<FormattedMessage id='dashboard.text.totals'/>}>
          
          <Row type="flex" justify="center" align-content="center">
              <Col xs={12} sm={12} md={6} lg={9} xl={9} style={{textAlign: "center"}}>
                
                <Statistic title={<FormattedMessage id='dashboard.text.gold-necessity'/>} value={dashboard.programmingTotalPRODUCT1} prefix={<Icon type="layout" theme="twoTone" twoToneColor="#ffd700" />} />


                {/* <p>Necesidad Gold: </p>
                <p><Title level={2}>{ {this.props.programmingTotalPRODUCT1} }</Title></p> */}
                
              </Col>
              
              <Col xs={12} sm={12} md={6} lg={9} xl={9} style={{textAlign: "center"}}>
                
                {/* <p>Necesidad Premium: </p> */}
                {/* <p><Title level={2} >{/* {this.props.programmingTotalPRODUCT2} </Title></p> */}
                <Statistic title={<FormattedMessage id='dashboard.text.premium-necessity'/>} value={dashboard.programmingTotalPRODUCT2} prefix={<Icon type="layout" theme="twoTone" twoToneColor="#7fc07b" />} />
              </Col>
              

              <Col xs={18} sm={18} md={6} lg={4} xl={4} style={{textAlign: "center", padding:"0rem 0rem 0rem 2rem"}}>
               
                  {/* <p>Total Necesidades: <b style={{fontSize:"1.5rem"}}>{dashboard.programmingTotal.total}</b> </p> */}
                  <Statistic title={<FormattedMessage id='dashboard.text.total-necessity'/>} value={dashboard.programmingTotal.total}/>
                  
{/*                     <Progress percent={dashboard.programmingTotal.new} successPercent={dashboard.programmingTotal.confirmed} showInfo={false} strokeWidth={10} />
 */}                  
                
              </Col>

              <Col xs={6} sm={6} md={6} lg={2} xl={2} style={{textAlign: "left"}}>
                <Progress percent={dashboard.programmingTotal.new} successPercent={dashboard.programmingTotal.confirmed} type="circle" width={70}  showInfo={false} />
              </Col>
          </Row>
          </Card>
          </Spin>
        </div>}
        extra={
          <Form  layout="inline" >
            <Form.Item {...formItemLayout} label={formatMessage({id: "general.calendar.week"})}>
              <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} onChange={this.onPickerChange} allowClear={false}/>
            </Form.Item>
            

       
          </Form>
        }>
        <Card type="inner" 
              style={{textAlign:"center"}}  
              
              extra={
                  <div>
                  <span>{formatMessage({id: "general.button-product.product"})}: &nbsp;</span>
                  <SelectProduct 
                  datesProductAll={products.productsAll} 
                  handleProduct={this.onProductChange}/>
                  </div>
                
              }>
          
        <Spin spinning={this.state.loading}>
          <StepsDashBoard currentDay={this.getNumberDay()} data={dashboard} />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
