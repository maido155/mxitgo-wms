import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form} from 'antd';


  

class tableModal extends PureComponent{

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 10 },md: { span: 10 },lg: { span: 10 },xl: { span:19 }},
        wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
            <Col xs={8} sm={9} md={9} lg={9} xl={9}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <label>Pallets</label></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <label>Cajas</label></Col>
           </Row>
          
           <Row>
             <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Jue 8 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Vie 9 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Sab 10 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Dom 11 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Lun 12 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Mar 13 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item label="Mie 14 Nov"></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <Input></Input></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={9} sm={9} md={9} lg={9} xl={9}> 
            <Form.Item label="Total" ></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>  <label>0</label></Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}> <label>0</label></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default tableModal;