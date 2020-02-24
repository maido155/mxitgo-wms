import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form} from 'antd';


class TableNewUser extends PureComponent{

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span:23 }},
   
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
            <Col ></Col>
            <Col > <label style={{ marginLeft:"5%"}}>Nombre</label></Col>
            <Col >  <Input></Input></Col>
           </Row>
          
           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Apeido paterno</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Apeido materno</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Correo electónico</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Teléfono</label></Col>
            <Col > <Input></Input></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default TableNewUser;