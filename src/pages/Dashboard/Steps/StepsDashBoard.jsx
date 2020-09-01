import React, { PureComponent } from 'react';
import {Steps, Progress, Divider, Icon} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';
import StepDayWeek from './StepDayWeek'
const { Step } = Steps;

class StepsDashBoard extends PureComponent {
  
  render() {
    const {currentDay,data} = this.props

      
        return (
        <div>
          
          <Steps    size="default" type="navigation" current={currentDay}>
            <StepDayWeek dataPerDay={data["Wednesday"]} title={<FormattedMessage id='dashboard.title.wednesday'/>} />
            <StepDayWeek dataPerDay={data["Thursday"]} title={<FormattedMessage id='dashboard.title.thursday'/>}/>
            <StepDayWeek dataPerDay={data["Friday"]}  title={<FormattedMessage id='dashboard.title.friday'/>}/>
            <StepDayWeek dataPerDay={data["Saturday"]} title={<FormattedMessage id='dashboard.title.saturday'/>}/>
            <StepDayWeek dataPerDay={data["Sunday"]} title={<FormattedMessage id='dashboard.title.sunday'/>}/>
            <StepDayWeek dataPerDay={data["Monday"]} title={<FormattedMessage id='dashboard.title.monday'/>}/>
            <StepDayWeek dataPerDay={data["Tuesday"]} title={<FormattedMessage id='dashboard.title.tuesday'/>}/>
            {/* <Step icon={<Icon type="calendar" />} title="Viernes" />
            <Step icon={<Icon type="calendar" />} title="Sábado" />
            <Step icon={<Icon type="calendar" />} title="Domingo" />
            <Step icon={<Icon type="calendar" />} title="Lunes" />
            <Step icon={<Icon type="calendar" />} title="Martes" /> */}
          </Steps>
          
        
          
        </div>
        );
    }
}
export default StepsDashBoard;