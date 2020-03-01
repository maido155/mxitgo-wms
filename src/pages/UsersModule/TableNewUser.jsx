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
            <Col > <label style={{   marginBottom:"3%", marginTop:"3%"}}>Nombre</label></Col>
             <Col style={{ marginBottom:"3%", marginTop:"3%"}} > <Input></Input></Col>
           </Row>
          
           <Row>
            <Col > <label style={{ marginBottom:"3%", marginTop:"3%"}}>Apellido paterno</label></Col>
             <Col style={{ marginBottom:"3%", marginTop:"3%"}} > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginBottom:"3%", marginTop:"3%"}}>Apellido materno</label></Col>
             <Col style={{ marginBottom:"3%", marginTop:"3%"}} > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginBottom:"3%", marginTop:"3%"}}>Correo electrónico</label></Col>
            <Col style={{ marginBottom:"3%", marginTop:"3%"}} > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginBottom:"3%", marginTop:"3%"}}>Teléfono</label></Col>
             <Col style={{ marginBottom:"3%", marginTop:"3%"}} > <Input></Input></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default TableNewUser;