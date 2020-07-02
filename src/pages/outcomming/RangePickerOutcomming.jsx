import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker } from 'antd';

const { RangePicker} = DatePicker;

export default class RangePickerOutcomming extends PureComponent{
    render(){
        return(
            <RangePicker style={{width: "100%"}}/>
        );
    }
}