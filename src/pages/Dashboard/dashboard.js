import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Calendario from './calendarDashboard';
import RadioDash from './radioDashboard';
import { Row, Col,Card,Divider} from 'antd';
import {isMobile} from "react-device-detect";
import 'moment/locale/en-au';
import GridVieew from './GridDashboard';

export default class Dashboard extends PureComponent {

  render() {
    if(isMobile){
    return (
     <PageHeaderWrapper>
      <Card>
          <div>
            <Calendario   dataOne={24} dataTwo={24} dataFour={"center"} dataFive={"center"} />
            </div>
            <div>
        <RadioDash dataEight={7} dataNine={13}/>
        </div>
        <div>
          <GridVieew/>
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
          <GridVieew dataOne={1} dataTwo={3} dataThree={4} dataFour={5} dataFive={150} dataSix={200}/>
        </div>
        </Card>
    </PageHeaderWrapper>
  );
}
}