import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form} from 'antd';
import modalCalendar from './modalCalendar'


class EditData extends PureComponent{

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span:23 }},
   
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
             <div>
             <modalCalendar/>
             </div>
           </Row>
          
           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Tipo de producto</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Cliente</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Cajas</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Pallets</label></Col>
            <Col > <Input></Input></Col>
           </Row>

           <Row>
            <Col > <label style={{ marginLeft:"5%"}}>Status</label></Col>
            <Col > <Input></Input></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
export default EditData;