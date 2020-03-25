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
                    <Col xs={0} sm={0} md={1} lg={2} xl={3}></Col>
                    <Col xs={24} sm={5} md={4} lg={3} xl={2} className={Styles.labelTitle}>
                        <Text strong>Cantidades</Text>
                    </Col>
                    <Col xs={7} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Premium</Text>
                        <Input/>
                    </Col>
                    <Col xs={5} sm={3} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Gold</Text>
                        <Input/>
                    </Col>
                    <Col xs={7} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Segunda</Text>
                        <Input/>
                    </Col>
                    <Col xs={5} sm={3} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Mano</Text>
                        <Input/>
                    </Col>
                    <Col xs={5} sm={3} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Dedo</Text>
                        <Input/>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={2} xl={3}></Col>
                </Row>
                {/* <Row type="flex" justify="space-around" className={Styles.row}>
                    <Col xs={0} sm={0} md={1} lg={2} xl={3}></Col>
                    <Col xs={24} sm={24} md={4} lg={3} xl={2} className={Styles.label}>
                        <Text strong>Temperatura</Text>
                    </Col>
                    <Col xs={7} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Premium</Text>
                        <Input/>
                    </Col>
                    <Col xs={7} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Gold</Text>
                        <Input/>
                    </Col>
                    <Col xs={7} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Segunda</Text>
                        <Input/>
                    </Col>
                    <Col xs={11} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Mano</Text>
                        <Input/>
                    </Col>
                    <Col xs={11} sm={4} md={3} lg={3} xl={3} className={Styles.label}>
                        <Text>Dedo</Text>
                        <Input/>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={2} xl={3}></Col>
                </Row> */}
            </div>
        );
    }
}

export default gridModalEntry;