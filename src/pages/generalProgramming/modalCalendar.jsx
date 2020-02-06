import { DatePicker, Radio } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Row, Col, Button, Icon, label } from 'antd';

const { RangePicker} = DatePicker;


class ModalCalendar extends PureComponent {
 

  render() {
    const {dataOne, dataTwo, dataThree, dataFour, dataFive,dataSix,dataSeven} = this.props;
    return(
        <div style={{marginBottom: "4%"}}>
            <Row type="flex" justify="left">
                <Col span={dataOne} style={{textAlign: dataFour}}>
                    <label>Semana: </label>
                </Col>
                <Col span={dataTwo} style={{textAlign: dataFive}}>
                    <RangePicker/>
                </Col>
                <Col span={dataThree} style={{textAlign: dataSix, padding: dataSeven}}>
                </Col>
            </Row>
        </div>
    );
 
}
}

export default ModalCalendar;