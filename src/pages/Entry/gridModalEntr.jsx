import React, { PureComponent } from 'react';
import {Tabs,Input, Row, Col, Button} from 'antd';

const { TabPane } = Tabs;
const InputGroup = Input.Group;
const { TextArea } = Input;

function callback(key) {
  console.log(key);
}


class gridModalEntry extends PureComponent {

state = { size: 'small' };
render() {
    const { size } = this.state;
    const {dataOne, dataTwo, dataThree, dataFour} = this.props;
    return (
        
      <span>    
  
        <InputGroup size="large">
            <Row gutter={dataOne} type="flex" justify="center">
                <Col span={dataTwo}>
                    <label></label>
                </Col>
                <Col span={dataTwo} >
                    <label>Premium</label>
                </Col>
                <Col span={dataTwo} >
                    <label>Gold</label>
                </Col>
                <Col span={dataTwo} >
                    <label>Segunda</label>
                </Col>
                <Col span={dataTwo} >
                    <label>Mano</label>
                </Col>
                <Col span={dataTwo} >
                    <label>Dedo</label>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                    <label>Cantidades</label>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}> 
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                    <label>Temperatura</label>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Input></Input>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                    <label>Fotos</label>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Button>Default</Button>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Button>Default</Button>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Button>Default</Button>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Button>Default</Button>
                </Col>
                <Col span={dataTwo} style={{padding:"0.5rem"}}>
                    <Button>Default</Button>
                </Col>
            </Row>
        
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                    <label>Comentarios</label>
                </Col>
                <Col span={dataThree}>
                <TextArea rows={dataFour} />
                </Col>
            </Row>
            </InputGroup>
       
        </span>
    );
}
}
export default gridModalEntry;