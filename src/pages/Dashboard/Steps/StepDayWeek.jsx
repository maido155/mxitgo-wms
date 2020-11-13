import React, { PureComponent } from 'react';
import {Steps, Progress, Icon, Typography} from 'antd';
import styles from './stepsDashboard.less';

import { FormattedMessage} from 'umi-plugin-react/locale';

const { Step } = Steps;
const { Text } = Typography;

class StepDayWeek extends PureComponent {
  getTotal=(dataPerDay)=>{
    return dataPerDay.planned+dataPerDay.confirmed+dataPerDay.cancelled;

  }
  render() {

    const {dataPerDay,title} = this.props;
    console.log(dataPerDay);

    
      
        return (

          <div>
              <div>
                <Icon className={styles.dayIcon} theme="twoTone" twoToneColor="#244999" type="calendar" /> &nbsp;
                <Text className={styles.dayName} strong>{title}</Text> 
              </div>
              <div className={styles.dayTotal}>
              <FormattedMessage id='dashboard.text.total'/> {this.getTotal(dataPerDay)}
              </div>
              <div>
              <Progress percent={dataPerDay.plannedPercentage} successPercent={dataPerDay.confirmedPercentage} showInfo={false} />
              </div>
              <div className={styles.dayDetailContainer}>
                <div>
                
                <FormattedMessage id='dashboard.text.planned'/>&nbsp;<b>{dataPerDay.planned}</b>
                </div>
                <div>
                <FormattedMessage id='dashboard.text.confirmed'/>&nbsp;<b>{dataPerDay.confirmed}</b>
                </div>
                <div>
                <FormattedMessage id='dashboard.text.canceled'/>&nbsp;<b>{dataPerDay.cancelled}</b>
                </div>
              </div>
               {/* <Steps.Step {...this.props}
            style={{width:"50%"}}
              icon={<Icon theme="twoTone" twoToneColor="#244999" type="calendar" />} 
              title={this.props.title}
              description={ <div>
                          <div style={{display:"flex"}}>
                                <div><FormattedMessage id='dashboard.text.total'/></div>
              <div style={{textAlign:"right",flexGrow:4}} ><h2>{this.getTotal(dataPerDay)}</h2></div>
                            </div>
                            <Progress percent={dataPerDay.plannedPercentage} successPercent={dataPerDay.confirmedPercentage} showInfo={false} />
                            <div style={{display:"flex"}}>
                                <div> <i> <FormattedMessage id='dashboard.text.planned'/></i></div>
                                <div style={{textAlign:"right",flexGrow:4}} ><b>{dataPerDay.planned}</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i><FormattedMessage id='dashboard.text.confirmed'/></i> </div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>{dataPerDay.confirmed}</b></div>
                            </div>
                            <div style={{display:"flex"}}>
                              <div><i> <FormattedMessage id='dashboard.text.canceled'/></i></div>
                              <div style={{textAlign:"right",flexGrow:4}}><b>{dataPerDay.cancelled}</b></div>
                            </div>
                            
                            </div>} /> */}
          </div>

           
          
              

          
        );
    }
}
export default StepDayWeek;