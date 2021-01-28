import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import StepDayWeek from './StepDayWeek'
import styles from './stepsDashboard.less';


class StepsDashBoard extends PureComponent {

  render() {
    const { currentDay, data } = this.props


    let classZero = styles.dayContainer + " " + (currentDay === 0 ? styles.currentDay : "");
    let classOne = styles.dayContainer + " " + (currentDay === 1 ? styles.currentDay : "");
    let classTwo = styles.dayContainer + " " + (currentDay === 2 ? styles.currentDay : "");
    let classThree = styles.dayContainer + " " + (currentDay === 3 ? styles.currentDay : "");
    let classFour = styles.dayContainer + " " + (currentDay === 4 ? styles.currentDay : "");
    let classFive = styles.dayContainer + " " + (currentDay === 5 ? styles.currentDay : "");
    let classSix = styles.dayContainerLast + " " + (currentDay === 6 ? styles.currentDay : "");



    return (
      <div>

        <Row type="flex" justify="space-around" >

          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classZero} >
            <StepDayWeek dataPerDay={data["Wednesday"]} title={<FormattedMessage id='dashboard.title.wednesday' />} ></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classOne}>
            <StepDayWeek dataPerDay={data["Thursday"]} title={<FormattedMessage id='dashboard.title.thursday' />} ></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classTwo}>
            <StepDayWeek dataPerDay={data["Friday"]} title={<FormattedMessage id='dashboard.title.friday' />}></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classThree}>
            <StepDayWeek dataPerDay={data["Saturday"]} title={<FormattedMessage id='dashboard.title.saturday' />}></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classFour}>
            <StepDayWeek dataPerDay={data["Sunday"]} title={<FormattedMessage id='dashboard.title.sunday' />}></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classFive}>
            <StepDayWeek dataPerDay={data["Monday"]} title={<FormattedMessage id='dashboard.title.monday' />}></StepDayWeek>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={3} className={classSix}>
            <StepDayWeek dataPerDay={data["Tuesday"]} title={<FormattedMessage id='dashboard.title.tuesday' />}></StepDayWeek>
          </Col>
        </Row>

        {/* <Steps    size="default" type="navigation" current={currentDay}>
            <StepDayWeek dataPerDay={data["Wednesday"]} title={<FormattedMessage id='dashboard.title.wednesday'/>} />
            <StepDayWeek dataPerDay={data["Thursday"]} title={<FormattedMessage id='dashboard.title.thursday'/>}/>
            <StepDayWeek dataPerDay={data["Friday"]}  title={<FormattedMessage id='dashboard.title.friday'/>}/>
            <StepDayWeek dataPerDay={data["Saturday"]} title={<FormattedMessage id='dashboard.title.saturday'/>}/>
            <StepDayWeek dataPerDay={data["Sunday"]} title={<FormattedMessage id='dashboard.title.sunday'/>}/>
            <StepDayWeek dataPerDay={data["Monday"]} title={<FormattedMessage id='dashboard.title.monday'/>}/>
            <StepDayWeek dataPerDay={data["Tuesday"]} title={<FormattedMessage id='dashboard.title.tuesday'/>}/>
          </Steps> */}



      </div>
    );
  }
}
export default StepsDashBoard;