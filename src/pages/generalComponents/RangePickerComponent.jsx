import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker } from 'antd';

const { RangePicker} = DatePicker;

export default class RangePickerComponent extends PureComponent{
    render(){
        return(
            <RangePicker/>
        );
    }
}