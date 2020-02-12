import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker, LocaleProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';

const { RangePicker} = DatePicker;

export default class RangePickerComponent extends PureComponent{
    render(){
        return(
            <LocaleProvider locale={esES}>
                <RangePicker style={{width: "100%"}}/>
            </LocaleProvider>
        );
    }
}