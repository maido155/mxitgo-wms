import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Calendario from './datePicker';
import Taabs from './tabsdashboard';
import { Row, Col,Card} from 'antd';
import {isMobile} from "react-device-detect";
import 'moment/locale/en-au';

export default class Dashboard extends PureComponent {

  render() {
    //if(isMobile){
    return (
     <PageHeaderWrapper>
      <Card>
      <Row>
          <Col span={10}>
          </Col>
          <Col span={14}>
            <Calendario/>
          </Col>
        </Row>
        <Taabs/>
        
      </Card>
     </PageHeaderWrapper>
    );
  }
 /* return (
    <PageHeaderWrapper>
    <Card>
    <Row>
        <Col span={18}>
        </Col>
        <Col span={6}>
          <Modal/>
        </Col>
      </Row>
    </Card>
    </PageHeaderWrapper>
  );
}*/
}