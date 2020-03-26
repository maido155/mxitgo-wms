import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col, Form, Select, Button} from 'antd';
const {Option}=Select;
const Cognito = require('./../../utils/Cognito.js');

class TableNewUser extends PureComponent{

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        
        Cognito.signUpCognito(values).then(function(data){
          var cognitoUser = data.user;
          var destination = data.codeDeliveryDetails.Destination;
          self.setState({
            visibleResultSuccess: true,
            dataresult: 'success',
            titleResultSuccess: `Usuario ${cognitoUser.getUsername()} creado con éxito.`,
            subTitleResultSuccess: `Enviamos un correo de verificación a: ${destination}`
          });
        }).catch(function(err) {
          self.setState({
            visibleResultSuccess: true,
            dataresult: 'error',
            titleResultSuccess: `${err.message || JSON.stringify(err)}`,
            subTitleResultSuccess: ``
          });
        });
      }
    });
  };

    render(){
      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span:23 }}
      };
        const {form}=this.props;
        const { getFieldDecorator } = form; //----

        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: "+521"
        })(
          <Select>
            <Option value="+521"> +521 </Option>
            <Option value="+522"> +522 </Option>
          </Select>,
        );

        return(
         <span>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row >
            <Form.Item label = {"Nombre de usuario"} > 
              {getFieldDecorator('name', { 
               rules: [{ required: true,message:'Ingrese su nombre'}]})
              (<Input  defaultValue="Nombre de usuario" />)}
                </Form.Item>
                </Row>
                <Row >
                <Form.Item label = {"Apellido paterno"} style={{marginTop:"0%" }}> 
              {getFieldDecorator('family_name', { 
               rules: [{ required: true,message:'Ingrese apellido paterno'}]})
              (<Input  defaultValue="Apellido paterno" />)}
                </Form.Item>
                </Row>

                <Form.Item label = {"Apellido materno"} style={{marginTop:"0%" }}> 
              {getFieldDecorator('middle_name' , { 
               rules: [{ required: true,message:'Ingrese apellido materno'}]})
              (<Input  defaultValue="Apellido materno" />)}
                </Form.Item>,

                <Form.Item label={"Correo Electrónico"}>
                 {getFieldDecorator('email',{ 
                  rules: [{ required: true, message: 'Ingrese su correo electrónico'},
                  { type: 'email', message: 'Formato invalido'}]})
                 (<Input defaultValue= "Correo electrónico"/>)}
                 </Form.Item>,

                 <Form.Item label={"Teléfono"}>
                 {getFieldDecorator('phone_number', { 
                 rules: [{ required: true, message:"Ingrese número de teléfono" },
                { pattern: /^\d{10}$/, message: "Teléfono inválido"}],})
                (<Input addonBefore={prefixSelector}/>)}
                </Form.Item>
                <Button type="primary" htmlType="submit">
                                               Crear Usuario
                                            </Button>
           </Form>
         </span>
        );
    }

}
export default Form.create()(TableNewUser);