import React, { PureComponent } from 'react';
import { DatePicker, Row,Col} from 'antd';
import moment from 'moment';

const {  RangePicker } = DatePicker;



class calendarDash extends PureComponent {
  render(){
    const {dataOne, dataTwo, dataFour, dataFive} = this.props;
    return(
        <div>
            <Row type="flex" justify="center">
                <Col span={dataOne} style={{textAlign: dataFour}}>
                    <h3>Semana:</h3>
                </Col>
                <Col span={dataTwo} style={{textAlign: dataFive}}>
                    <RangePicker/>
                </Col>
              
            </Row>
        </div>
    );
}
}
export default calendarDash;