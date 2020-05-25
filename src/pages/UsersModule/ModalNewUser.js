import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import {isMobile} from 'react-device-detect';
import { Drawer, Form, Row, Col, Input, Select, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StyleUser.css';

const { Option } = Select;
var ladaPhone = "+521";

class ModalNewUser extends PureComponent{
  checkPassword = (rule= any, value= string, callback= (messgae= string)) => {
    let upperCase = /[A-Z]/.test(value);
    let lowerCase = /[a-z]/.test(value)
    let number = /[0-9]/.test(value)
    let character = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    if(value == ""){
      callback('¡Por favor, introduzca su contraseña!')
    }
    if(upperCase == false){
      callback('Debe tener una letra mayúscula')
    }
    if(lowerCase == false){
      callback('Debe tener una minuscula')
    }
    if(number == false){
      callback('Debe tener un numero')
    }
    if(character == false){
      callback('Debe tener un character')
    }
    if(value.length < 8){
      callback('Ingrese al menos 8 caracteres')
    }
  }
  checkConfirm = (rule= any, value= string, callback= (messgae= string)) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'register.security.message.password-again' }));
    } else {
      callback();
    }
  };
  render(){
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 10 },lg: { span: 9 },xl: { span: 7 }},
      wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 13 },lg: { span: 14 },xl: { span: 15  }}
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: ladaPhone,
    })(
      <Select>
        <Option value="+521"><FormattedMessage id="accountSettings.label.prefix-one"/></Option>
        <Option value="+522"><FormattedMessage id="accountSettings.label.prefix-two"/></Option>
      </Select>,
    );
    return(
      <Drawer
        title="Nuevo Usuario"
        width={isMobile ? "100%" : "50%"}
        onClose={this.props.cancel}
        visible={this.props.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
                <Form {...formItemLayout}>
          <Row>
            <Col span={24}>
              <Form.Item label={formatMessage({ id: 'register.label.name' })}>
                {getFieldDecorator('name', { rules: [{ required: true, message: <FormattedMessage id="register.mode.message.name"/>}]})
                (<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={formatMessage({ id: 'register.label.lastfam' })}>
                {getFieldDecorator('family_name',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastfam"/>}]})
                (<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={formatMessage({ id: 'register.label.lastmid' })}>
                {getFieldDecorator('middle_name',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastmid"/>}]})
                (<Input/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={formatMessage({ id: 'register.label.email' })}>
                {getFieldDecorator('email',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.email"/>},
                  { type: 'email', message: <FormattedMessage id="register.mode.message.email-inv"/>}]})
                (<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={"Contraseña"}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, validator: this.checkPassword }]})
                (<Input.Password size="large" type="password"/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={"Confirmar contraseña"}>
                {getFieldDecorator('confirm', {rules: [{ required: true, message: <FormattedMessage id="register.label.message.password"/>},
                { validator: this.checkConfirm }]})(<Input.Password size="large" type="password"/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={formatMessage({ id: 'register.label.phone' })}>
                {getFieldDecorator('phone_number', { rules: [{ required: true, message: <FormattedMessage id="register.mode.message.phone"/> },
                  { pattern: /^\d{10}$/, message: <FormattedMessage id="register.security.message.phone"/>}],})
                (<Input addonBefore={prefixSelector}/>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={this.props.cancel} type="danger" className={Styles.cancelarfooter}>
            Cancelar
          </Button>
          <Button onClick={this.props.cancel} type="primary">
            Guardar
          </Button>
        </div>
      </Drawer>
    );
  }
}
export default Form.create()(ModalNewUser);