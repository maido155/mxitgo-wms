import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker } from 'antd';

export default class DatePickerComponent extends PureComponent{
    render(){
        return(
                <DatePicker style={{ width: '100%'}}/>
        );
    }
}