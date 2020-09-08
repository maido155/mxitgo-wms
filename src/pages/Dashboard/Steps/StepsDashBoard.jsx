import React, { PureComponent } from 'react';
import {Steps, Row, Col, Progress, Icon} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';
import StepDayWeek from './StepDayWeek'
import styles from './stepsDashboard.less';

const { Step } = Steps;

class StepsDashBoard extends PureComponent {
  
  render() {
    const {currentDay,data} = this.props

      
        return (
        <div>

          <Row type="flex" justify="center" >
            
            <Col xs={24} sm={12} md={6} lg={4} xl={4} className={styles.dayContainer}>
              <div>
              <Icon className={styles.dayIcon} theme="twoTone" twoToneColor="#244999" type="calendar" /> Wednesday
              </div>
              <div>
                Total: 
              </div>
              <div>
              <Progress percent={50} successPercent={40} showInfo={false} />
              </div>
              <div>
              Planned:
              </div>
              <div>
              Confirmed:
              </div>
              <div>
              Canceled:
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={3} xl={3} className={styles.dayContainer}>
              <div>
                (icon) Thursday
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={3} xl={3} className={styles.dayContainer}>
              <div>
                (icon) Friday
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={4} xl={4} className={styles.dayContainer}>
              <div>
                (icon) Saturday
              </div>
            </Col>
            <Col xs={24} sm={12} md={7} lg={3} xl={3} className={styles.dayContainer}>
              <div>
                (icon) Sunday
              </div>
            </Col>
            <Col xs={24} sm={12} md={7} lg={3} xl={3} className={styles.dayContainer}>
              <div>
                (icon) Monday
              </div>
            </Col>
            <Col xs={24} sm={24} md={7} lg={4} xl={4} className={styles.dayContainerLast}>
              <div>
                (icon) Tuesday
              </div>
            </Col>
          </Row>

          <Steps    size="default" type="navigation" current={currentDay}>
            <StepDayWeek dataPerDay={data["Wednesday"]} title={<FormattedMessage id='dashboard.title.wednesday'/>} />
            <StepDayWeek dataPerDay={data["Thursday"]} title={<FormattedMessage id='dashboard.title.thursday'/>}/>
            <StepDayWeek dataPerDay={data["Friday"]}  title={<FormattedMessage id='dashboard.title.friday'/>}/>
            <StepDayWeek dataPerDay={data["Saturday"]} title={<FormattedMessage id='dashboard.title.saturday'/>}/>
            <StepDayWeek dataPerDay={data["Sunday"]} title={<FormattedMessage id='dashboard.title.sunday'/>}/>
            <StepDayWeek dataPerDay={data["Monday"]} title={<FormattedMessage id='dashboard.title.monday'/>}/>
            <StepDayWeek dataPerDay={data["Tuesday"]} title={<FormattedMessage id='dashboard.title.tuesday'/>}/>
          </Steps>
          
        
          
        </div>
        );
    }
}
export default StepsDashBoard;