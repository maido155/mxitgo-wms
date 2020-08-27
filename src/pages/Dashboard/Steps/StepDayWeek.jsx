import React, { PureComponent } from 'react';
import {Steps, Progress, Icon,Statistic} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';

const { Step } = Steps;

class StepDayWeek extends PureComponent {
  getTotal=(dataPerDay)=>{
    return dataPerDay.planned+dataPerDay.confirmed+dataPerDay.cancelled;

  }
  render() {

    const {dataPerDay} = this.props;
    console.log(dataPerDay);

    
      
        return (


            <Steps.Step {...this.props}
            style={{width:"50%"}}
              icon={<Icon theme="twoTone" twoToneColor="#244999" type="calendar" />} 
              title={this.props.title}
              description={ <div>
                          <div style={{display:"flex"}}>
                                <div>Total:</div>
              <div style={{textAlign:"right",flexGrow:4}} ><h2>{dataPerDay.programmed}</h2></div>
                            </div>
                            <Progress percent={dataPerDay.plannedPercentage} successPercent={dataPerDay.confirmedPercentage} showInfo={false} />
                            <div style={{display:"flex"}}>
                                <div> <i> Planeados:</i></div>
                                <div style={{textAlign:"right",flexGrow:4}} ><b>{dataPerDay.planned}</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i>Confirmados:</i> </div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>{dataPerDay.confirmed}</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i> Cancelados:</i></div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>{dataPerDay.cancelled}</b></div>
                            </div>
                            
                            </div>} />
          
              

          
        );
    }
}
export default StepDayWeek;