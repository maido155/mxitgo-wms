import React, { PureComponent } from 'react';
import { Row, Col} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';
import StepDayWeek from './StepDayWeek'
import styles from './stepsDashboard.less';


class StepsDashBoard extends PureComponent {
  
  render() {
    const {currentDay,data} = this.props

      
        return (
        <div>

          <Row type="flex" justify="center" >
            
            <Col xs={24} sm={12} md={6} lg={6} xl={4} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Wednesday"]} title={<FormattedMessage id='dashboard.title.wednesday'/>} ></StepDayWeek>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={4} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Thursday"]} title={<FormattedMessage id='dashboard.title.thursday'/>} ></StepDayWeek>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={3} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Friday"]}  title={<FormattedMessage id='dashboard.title.friday'/>}/>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={4} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Saturday"]} title={<FormattedMessage id='dashboard.title.saturday'/>}/>
            </Col>
            <Col xs={24} sm={12} md={7} lg={7} xl={3} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Sunday"]} title={<FormattedMessage id='dashboard.title.sunday'/>}/>
            </Col>
            <Col xs={24} sm={12} md={7} lg={7} xl={3} className={styles.dayContainer}>
              <StepDayWeek dataPerDay={data["Monday"]} title={<FormattedMessage id='dashboard.title.monday'/>}/>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={3} className={styles.dayContainerLast}>
              <StepDayWeek dataPerDay={data["Tuesday"]} title={<FormattedMessage id='dashboard.title.tuesday'/>}/>
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