import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Calendario from './calendarDashboard';
import RadioDash from './radioDashboard';
import { Row, Col,Card,Divider} from 'antd';
import {isMobile, isTablet} from "react-device-detect";
import 'moment/locale/en-au';
import GridDashboard from './GridDashboard';

export default class Dashboard extends PureComponent {

  render() {
    if(isTablet){
    return (
     <PageHeaderWrapper>
      <Card>
          <div>
            <Calendario   dataOne={24} dataTwo={24} dataFour={"center"} dataFive={"center"} />
            </div>
            <Divider/>
            <div>
        <RadioDash dataEight={5} dataNine={15}/>
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
    
            <Calendario dataOne={7} dataTwo={9} dataFour={"right"} dataFive={"center"} />
       </div>
       <Divider/>
       <div>
        <RadioDash dataEight={1} dataNine={24}/>
        </div>
        <div>
          <GridDashboard xs={24} sm={12} md={8} lg={6} xl={3} txs={15} tsm={10} tmd={8} tlg={7} txl={6} dataTwo={3} dataThree={4} dataFour={2} dataFive={150} dataSix={200}/>
        </div>
        </Card>
    </PageHeaderWrapper>
  );
}
}