import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker, Row, Col } from 'antd';

const { RangePicker} = DatePicker;

export default class Calendar extends PureComponent{
    render(){
        const {dateOne, dateTwo}= this.props;
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={dateOne} style={{textAlign:"center"}}>
                        <h3>Semana:</h3>
                    </Col>
                    <Col span={dateTwo} style={{textAlign:"center"}}>
                        <RangePicker/>
                    </Col>
                </Row>
            </div>
        );
    }
}