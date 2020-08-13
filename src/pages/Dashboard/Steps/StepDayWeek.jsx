import React, { PureComponent } from 'react';
import {Steps, Progress, Icon,Statistic} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';

const { Step } = Steps;

class StepDayWeek extends PureComponent {
  
  render() {
      
        return (


            <Steps.Step {...this.props}
              icon={<Icon theme="twoTone" twoToneColor="#244999" type="calendar" />} 
              title={this.props.title}
              description={ <div>
                          <div style={{display:"flex"}}>
                                <div>Total:</div>
                                <div style={{textAlign:"right",flexGrow:4}} ><h2>35</h2></div>
                            </div>
                            <Progress percent={50} showInfo={false} />
                            <div style={{display:"flex"}}>
                                <div> <i> Planeados:</i></div>
                                <div style={{textAlign:"right",flexGrow:4}} ><b>10</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i>Confirmados:</i> </div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>20</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i> Cancelados:</i></div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>5</b></div>
                            </div>
                            
                            </div>} />
          
              

          
        );
    }
}
export default StepDayWeek;