import React, { PureComponent } from 'react';
import {Steps, Progress, Divider, Icon} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';
import StepDayWeek from './StepDayWeek'
const { Step } = Steps;

class StepsDashBoard extends PureComponent {
  
  render() {
    const {currentDay} = this.props
      
        return (
        <div>
          <Steps   type="navigation" size="small"  current={currentDay+4}>
            <StepDayWeek title="Miércoles &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
            <StepDayWeek title=" &nbsp; Jueves &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "/>
            <StepDayWeek title="Viernes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
            <StepDayWeek title="Sábado &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
            <StepDayWeek title="Domingo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
            <StepDayWeek title="Lunes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
            <StepDayWeek title="&nbsp;Martes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
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