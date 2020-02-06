import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Row, Col, Radio } from 'antd';

export default class radioGroupModalEntry extends PureComponent{
    render(){
        const {dataEight,dataNine} = this.props;
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={dataEight} style={{textAlign: "center"}}>
                    </Col>
                    <Col span={dataNine} style={{textAlign: "center"}}>
                        <Radio.Group defaultValue="a">
                            <Radio.Button value="a">Recibidos</Radio.Button>
                            <Radio.Button value="b">Merma</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        );
    }
}