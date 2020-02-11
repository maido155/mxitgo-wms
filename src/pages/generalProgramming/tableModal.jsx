import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form} from 'antd';


  

class tableModal extends PureComponent{

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 9 }},
        wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <label>Pallets</label></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <label>Cajas</label></Col>
           </Row>
          
           <Row>
             <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Jue 8 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Vie 9 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Sab 10 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Dom 11 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Lun 12 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Mar 13 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Mie 14 Nov"></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <Input></Input></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
            <Form.Item label="Total" ></Form.Item></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>  <label>0</label></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}> <label>0</label></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default tableModal;