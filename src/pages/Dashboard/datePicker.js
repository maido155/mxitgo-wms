import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const {  RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


class datePickerDash extends PureComponent {
    render() {
        //if(isMobile){
         return (
            <div>
            <label>Semana:</label>
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}
            />
          </div>
    
         );
       // }
    }

}
export default datePickerDash;