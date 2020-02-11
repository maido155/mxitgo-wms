import React, { PureComponent } from 'react';
import {Input, Row, Col, Button,Icon,Form} from 'antd';

const InputGroup = Input.Group;
const { TextArea } = Input;

function callback(key) {
  console.log(key);
}


class gridModalEntry extends PureComponent {

state = { size: 'small' };
render() {
    
    const {dataOne, dataTwo, dataThree, dataFour, whidthPhoto, paddingCols} = this.props;

    const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 9 }},
        wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
    return (
        
      <span>    
    <form>
        <InputGroup size="large">
            <Row gutter={dataOne} type="flex" justify="center">
                <Col span={dataTwo}style={{padding: paddingCols}}>
                    <label></label>
                </Col>
                <Col span={dataTwo}style={{padding: paddingCols}} >
                    <label>Premium</label>
                </Col>
                <Col span={dataTwo}style={{padding: paddingCols}} >
                    <label>Gold</label>
                </Col>
                <Col span={dataTwo}style={{padding: paddingCols}} >
                    <label>Segunda</label>
                </Col>
                <Col span={dataTwo}style={{padding: paddingCols}} >
                    <label>Mano</label>
                </Col>
                <Col span={dataTwo}style={{padding: paddingCols}} >
                    <label>Dedo</label>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                <Form.Item label="Cantidades">
                    </Form.Item>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}> 
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                <Form.Item label="Temperatura">
                    </Form.Item>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Input></Input>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                <Form.Item label="Fotos">
                    </Form.Item>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
                <Col span={dataTwo} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
            </Row>
        
            <Row type="flex" justify="center">
                <Col span={dataTwo} >
                <Form.Item label="Comentarios">
                    </Form.Item>
                </Col>
                <Col span={dataThree} style={{padding: paddingCols}}>
                <TextArea rows={dataFour} />
                </Col>
            </Row>

            <Row type="flex" justify="center">
                <Col span={dataTwo}>
                     <Form.Item label="Tomar foto">
                    </Form.Item>
                </Col>
                <Col span={dataThree} style={{padding: paddingCols}}>
                    <Button size="large" style={{ width: whidthPhoto }}><Icon type="camera"/></Button>
                </Col>
            </Row>
            </InputGroup>
            </form>
        </span>
    );
}
}
export default gridModalEntry;