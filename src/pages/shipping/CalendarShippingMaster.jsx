import React, { PureComponent } from 'react'; //ask to Miguel
import { _ } from 'lodash'; 

import {
    DatePicker
} from 'antd';

const { RangePicker} = DatePicker;
  
class CalendarShippingMaster extends PureComponent{
    render(){
        return(
            <RangePicker/>
        );
    }
}

export default CalendarShippingMaster;