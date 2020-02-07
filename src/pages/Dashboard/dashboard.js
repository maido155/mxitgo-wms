import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioDash from '../generalComponents/RadioGroupComponent';
import { Row, Col,Card,Divider} from 'antd';
import {isMobile, isTablet} from "react-device-detect";
import 'moment/locale/en-au';
import GridDashboard from './GridDashboard';

export default class Dashboard extends PureComponent {

  render() {
    if(isMobile){
    return (
     <PageHeaderWrapper>
      <Card>
          <div>
          <Row type="flex" justify="center">
                <Col span={24} style={{textAlign: "center"}}>
                    <h3>Semana:</h3>
                </Col>
                <Col span={24} >
                    <RangePickerComponent />
                </Col>
      </Row>
            </div>
            <Divider/>
            <div>
             <Row type="flex" justify="right">
                <Col span={5} style={{textAlign: "center"}}>
                </Col>
                <Col span={15} style={{textAlign: "center", margin:"1rem"}}>
                   <RadioDash/>
                </Col>
             </Row>
        </div>
        <Divider/>
        <div>
          <GridDashboard xs={12} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} dataTwo={3} dataThree={3} dataFour={3} dataFive={130} dataSix={200} dataSeven={15}/>
        </div>
      </Card>
     </PageHeaderWrapper>
    );
  }
  return (
    <PageHeaderWrapper>
    <Card>
      <div>
      <Row type="flex" justify="center">
                <Col span={7} style={{textAlign: "right"}}>
                    <h3>Semana:</h3>
                </Col>
                <Col span={9} >
                    <RangePickerComponent />
                </Col>
      </Row>
       </div>
       <Divider/>
       <div>
       <Row type="flex" justify="right">
                <Col span={1} style={{textAlign: "center"}}>
                </Col>
                <Col span={24} style={{textAlign: "center", margin:"1rem"}}>
                   <RadioDash/>
                </Col>
        </Row>
        </div>
        <div>
          <GridDashboard xs={24} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} dataTwo={3} dataThree={4} dataFour={2} dataFive={150} dataSix={200}/>
        </div>
        </Card>
    </PageHeaderWrapper>
  );
}
}