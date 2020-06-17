import { DatePicker, Radio, Form } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Row, Col, Button, Icon, label } from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';

const { RangePicker} = DatePicker;


class ModalCalendar extends PureComponent {
 

  render() {
    const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 10 },md: { span: 10 },lg: { span: 10 },xl: { span: 10 }},
        wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
    const {dataOne, dataTwo, dataThree, dataFour, dataFive,dataSix,dataSeven} = this.props;
    return(

        <div style={{marginBottom: "4%"}}>
            <span>
            <Form {...formItemLayout}> 
            <Row type="flex" justify="center">
                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{textAlign:"left"}}>
                    <label><FormattedMessage id="general.calendar.week"/> </label>
                </Col>
                <Col  xs={18} sm={18} md={18} lg={18} xl={18}>
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

//export default ModalCalendar;
export default Form.create()(ModalCalendar);