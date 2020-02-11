import { DatePicker, Radio, Form } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Row, Col, Button, Icon, label } from 'antd';

const { RangePicker} = DatePicker;


class ModalCalendar extends PureComponent {
 

  render() {
    const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 9 }},
        wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
    const {dataOne, dataTwo, dataThree, dataFour, dataFive,dataSix,dataSeven} = this.props;
    return(

        <div style={{marginBottom: "4%"}}>
            <span>
            <Form {...formItemLayout}> 
            <Row type="flex" justify="left">
                <Col  style={{textAlign:"center"}}>
                    <label>Semana: </label>
                </Col>
                <Col  xs={20} sm={20} md={20} lg={20} xl={20}>
                    <RangePicker/>
                </Col>
                <Col>
                </Col>
            </Row>
            </Form>
            </span>
        </div>
    );
 
}
}

export default ModalCalendar;