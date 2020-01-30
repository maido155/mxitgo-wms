import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { DatePicker, Row, Col, Button, Icon } from 'antd';

const { RangePicker} = DatePicker;
  
export default class CalendarShippingMaster extends PureComponent{
    render(){
        const {dataOne, dataTwo, dataThree, dataFour, dataFive,dataSix,dataSeven} = this.props;
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={dataOne} style={{textAlign: dataFour}}>
                        <h3>Semana:</h3>
                    </Col>
                    <Col span={dataTwo} style={{textAlign: dataFive}}>
                        <RangePicker/>
                    </Col>
                    <Col span={dataThree} style={{textAlign: dataSix, padding: dataSeven}}>
                        <Button type="primary" shape="circle" size="large">
                            <Icon type="plus" />
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}