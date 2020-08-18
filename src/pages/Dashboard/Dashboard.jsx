import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelectProduct from '../generalComponents/SelectProduct';
import { Row, Col, Card, Tooltip, Typography, Progress, Form, DatePicker, Statistic,Icon, Steps } from 'antd';
import { isMobile, isTablet } from "react-device-detect";
import { formatMessage } from 'umi-plugin-react/locale';
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




@connect(({ dashboard,programming, loading }) => ({
  dashboard,
  programming,
  loading: loading.models.dashboard,
  datesProductAll: programming.datesProductAll,
  currentSelectedDate: dashboard.currentSelectedDate,
  currentSelectedProduct: dashboard.currentSelectedProduct
}))



export default class Dashboard extends PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'programming/fetchProductAll',
      payload: {
          payload: {
           Authorization: sessionStorage.getItem('idToken'),
           type: "Primary"
          }
       },
    });
    
  }

  state = {
    currentSelectedDate : "2020-07-08",
    currentSelectedProduct: "",
    currentSelectedProductDesc:"",
    currentCustomer : "CUSTOMER-1",
    products: ["PRODUCT-1", "PRODUCT-2"]
  };

  selectionMade = (product, customer, startDate) => {

    if( product === "" || customer ==="" || startDate ==="")
    {
      return;
    }
    
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
        products: this.state.products,
        Authorization: sessionStorage.getItem('idToken')
      }
    });



    ///////// Bring 7 days

    var currentDate = moment(startDate, "YYYY-MM-DD");
    var weekStart = currentDate;
    //var weekEnd = currentDate.add(6, 'days');
    var aDays = [0, 1, 2, 3, 4, 5, 6];



    for (const i of aDays) {

        this.props.dispatch({
          type: 'dashboard/getDay',
          payload: {
            Authorization: sessionStorage.getItem('idToken'),
            startDate,
            customer,
            product: this.state.currentSelectedProduct,
            deliveryDate: moment(weekStart).add(i, 'days').format("YYYY-MM-DD"),
            dayName: moment(weekStart).add(i, 'days').format("dddd")
          }
        })

    }

    

  };
  

  getNumberDay=()=>{
    var dt= new Date();
    let aWeek=[3,4,5,6,0,1,2];
    return aWeek.findIndex( item=> item ==  dt.getDay())
    
  }



  onPickerChange = (oEvent) => {

      /// Get current product selection
      /// Customer hardcoded
      //PRODUCT-2|CUSTOMER-1


      this.setState({currentSelectedDate: oEvent.format("YYYY-MM-DD")})

      this.selectionMade(this.state.currentSelectedProduct, this.state.currentCustomer, oEvent.format("YYYY-MM-DD"));


    
  }


  onProductChange  = (value,key) => {

      this.setState(
        {
          currentSelectedProduct: value,
          currentSelectedProductDesc:key.props.children
        })

      this.selectionMade(value, this.state.currentCustomer, this.state.currentSelectedDate);

  }

  render() {

    let { datesProductAll} = this.props;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 9 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 9 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
    };

    return (
      <PageHeaderWrapper
        content={<div>
          
          <Card type="inner" size="small" style={{textAlign:"center"}}  title="Totales">
          
          <Row type="flex" justify="center" align-content="center">
              
              <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: "center"}}>
                
                <Statistic title="Necesidad Gold" value={0} prefix={<Icon type="layout" theme="twoTone" twoToneColor="#ffd700" />} />


                {/* <p>Necesidad Gold: </p>
                <p><Title level={2}>{ {this.props.programmingTotalPRODUCT1} }</Title></p> */}
                
              </Col>
              
              <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: "center"}}>
                
                {/* <p>Necesidad Premium: </p> */}
                {/* <p><Title level={2} >{/* {this.props.programmingTotalPRODUCT2} </Title></p> */}
                <Statistic title="Necesidad Premium" value={0} prefix={<Icon type="layout" theme="twoTone" twoToneColor="#7fc07b" />} />
              </Col>

              <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: "center", padding:"0rem 2rem"}}>
               
                  <p>Total Necesidades: </p>
                  <p><Title level={2}>{/* {this.props.programmingTotal.programmingTotal} */}</Title></p>
                  <Tooltip  >
                    <Progress percent={0} successPercent={0} showInfo={false} strokeWidth={10} />
                  </Tooltip>
                
              </Col>
          </Row>
          </Card>
        </div>}
        extra={
          <Form style={{paddingRight:"2rem"}} layout="inline" >
            <Form.Item {...formItemLayout} label={formatMessage({id: "general.calendar.week"})}>
              <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} onChange={this.onPickerChange}/>
            </Form.Item>
            <Form.Item {...formItemLayout} label={formatMessage({id: "general.button-product.product"})}>
              <SelectProduct datesProductAll={datesProductAll} handleProduct={this.onProductChange}/>
            </Form.Item>

            {/* <div>
              <Row type="flex" justify="space-between">
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                  
                </Col>
              </Row>
            </div> */}

          </Form>
        }>
        <Card type="inner" style={{textAlign:"center"}}  title={`Product: ${this.state.currentSelectedProductDesc}`}>
          
          <div>
          <StepsDashBoard currentDay={this.getNumberDay()} data={this.props.dashboard} />
          
            {/* <GridDashboard  
            Monday = {this.props.dashboard.Monday} 
            Tuesday = {this.props.dashboard.Tuesday} 
            Wednesday = {this.props.dashboard.Wednesday} 
            Thursday = {this.props.dashboard.Thursday} 
            Friday = {this.props.dashboard.Friday} 
            Saturday = {this.props.dashboard.Saturday} 
            Sunday = {this.props.dashboard.Sunday} 
            programmingTotal = {this.props.dashboard.programmingTotal} 
            programmingTotalPRODUCT1={this.props.dashboard.programmingTotalPRODUCT1} 
            programmingTotalPRODUCT2={this.props.dashboard.programmingTotalPRODUCT2} 
            xs={24} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} 
            dataTwo={3} 
            dataThree={4} 
            dataFour={2} 
            dataFive={150} 
            dataSix={200} /> */}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
