import React, { PureComponent } from 'react';
import {Tabs,Input, Row, Col} from 'antd';

const { TabPane } = Tabs;
const InputGroup = Input.Group;
const { TextArea } = Input;

function callback(key) {
  console.log(key);
}


class tabsModalEntry extends PureComponent {
    state = { size: 'small' };
    render() {
        const { size } = this.state;
        return (
            
          <span>    
            <Tabs onChange={callback} type="card" size={size}>
            <TabPane tab="Recibidos" key="1">
            <InputGroup size="large">
                <Row gutter={8}>
                    <Col span={4}>
                        <label></label>
                    </Col>
                    <Col span={4} >
                        <label>Premium</label>
                    </Col>
                    <Col span={4} >
                        <label>Gold</label>
                    </Col>
                    <Col span={4} >
                        <label>Segunda</label>
                    </Col>
                    <Col span={4} >
                        <label>Mano</label>
                    </Col>
                    <Col span={4} >
                        <label>Dedo</label>
                    </Col>
                </Row>
                <Row >
                    <Col span={4}>
                        <label>Cantidades</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}> 
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>Temperatura</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>Fotos</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
            
                <Row>
                    <Col span={4}>
                        <label>Comentarios</label>
                    </Col>
                    <Col span={20}>
                    <TextArea rows={4} />
                    </Col>
                </Row>
                </InputGroup>
            </TabPane>
            <TabPane tab="Merma" key="2">
            <InputGroup size="large">
            <Row gutter={8}>
                <Col span={4}>
                    <label></label>
                </Col>
                <Col span={4}>
                    <label>Premium</label>
                </Col>
                <Col span={4}>
                    <label>Gold</label>
                </Col>
                <Col span={4}>
                    <label>Segunda</label>
                </Col>
                <Col span={4}>
                    <label>Mano</label>
                </Col>
                <Col span={4}>
                    <label>Dedo</label>
                </Col>
            </Row>
            
            <Row >
                    <Col span={4}>
                        <label>Cantidades</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}> 
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>Temperatura</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>Fotos</label>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                    <Col span={4} style={{padding:"0.5rem"}}>
                        <Input></Input>
                    </Col>
                </Row>
            
            <Row>
                <Col span={4}>
                    <label>Comentarios</label>
                </Col>
                <Col span={20}>
                <TextArea rows={4} />
                </Col>
            </Row>
            </InputGroup>
            </TabPane> 
            </Tabs>
          </span>
    );
  }
}

export default tabsModalEntry;