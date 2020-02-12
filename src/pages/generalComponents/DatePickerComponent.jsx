import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker, LocaleProvider  } from 'antd';
import esES from 'antd/es/locale/es_ES';

export default class DatePickerComponent extends PureComponent{
    render(){
        return(
            <LocaleProvider locale={esES}>
                <DatePicker style={{ width: '100%'}}/>
            </LocaleProvider>
        );
    }
}