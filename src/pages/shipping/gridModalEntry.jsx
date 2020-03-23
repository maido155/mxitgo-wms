import React, { PureComponent } from 'react';
import {Input, Row, Col, Button,Icon,Form} from 'antd';
import { Typography } from 'antd';
import Styles from './StylesShipping.css';

const { Text } = Typography;
const InputGroup = Input.Group;
const { TextArea } = Input;

class gridModalEntry extends PureComponent {
    render() {
        return (
            <div>
                <Row type="flex" justify="space-around">
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text strong>Cantidades:</Text>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text>Premium</Text>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text>Gold</Text>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text>Segunda</Text>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text>Mano</Text>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text>Dedo</Text>
                        <Input/>
                    </Col>
                </Row>

                <Row type="flex" justify="space-around" className={Styles.input}>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Text></Text>
                        <Text strong>Temperatura:</Text>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Input/>
                    </Col>
                    <Col xs={8} sm={7} md={6} lg={6} xl={3} className={Styles.label}>
                        <Input/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default gridModalEntry;