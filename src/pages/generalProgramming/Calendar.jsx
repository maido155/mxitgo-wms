import { DatePicker, Radio } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Calendar extends PureComponent {
  state = {
    size: 'default',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <DatePicker size={size} />
      </div>
    );
  }
}

export default Calendar;