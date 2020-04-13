import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form} from 'antd';


  

class tableModal extends PureComponent{

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span:23 }},
   
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
            <Col xs={8} sm={9} md={9} lg={9} xl={9}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <label style={{ marginLeft:"10%"}}>Pallets</label></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <label style={{ marginLeft:"10%"}}>Cajas</label></Col>
           </Row>
          
           <Row>
             <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Jue 8 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Vie 9 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Sab 10 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Dom 11 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Lun 12 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Mar 13 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row style={{height: "1%"}}>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} style={{ marginLeft:"30%"}} label="Mie 14 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Input></Input></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <Input></Input></Col>
           </Row>
           <Row>
            <Col xs={9} sm={9} md={9} lg={9} xl={9}> 
            <Form.Item label="Total:" style={{ marginRight:"24%"}} ></Form.Item></Col>
            <Col xs={7} sm={3} md={3} lg={3} xl={3}>   <Form.Item ><label  style={{ marginLeft:"50%"}}>0</label></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Form.Item> <label  style={{ marginLeft:"30%"}}>0</label></Form.Item></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default tableModal;