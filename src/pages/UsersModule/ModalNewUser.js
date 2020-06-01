import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import {isMobile} from 'react-device-detect';
import { Drawer, Form, Row, Col, Input, Select, Button, Spin, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StyleUser.css';

const { Option } = Select;
var numberPhone = "";
var ladaPhone = "+521";
class ModalNewUser extends PureComponent{
  state = {
    confirmDirty: false
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'register.security.message.password-again' }));
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    let upperCase = /[A-Z]/.test(value);
    let lowerCase = /[a-z]/.test(value)
    let number = /[0-9]/.test(value)
    let character = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if(value == undefined || value == ""){
      callback();
      return;
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
    callback();
  };
  saveFormRefNewLine = (formRef) => {
    this.formRefNewLine = formRef;
  }
  handleSubmit = e => {
    e.preventDefault();
    let _self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(err){
        return;
      }
      var phone_number = values.prefix + values.phone_number;
      values.phone_number = phone_number;
      if(this.props.edit == false){
        _self.props.saveNewUser(values);
      }else{
        _self.props.updateNewUser(values);
      }
      this.props.form.resetFields();
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const { edit, loading, saveUser, closeUser, dataUser, updateUser } = this.props;
    numberPhone = "";
    const number = dataUser.phone_number;
    if(saveUser == true){
      this.props.changedSuccess();
      message.success('Se agregó con éxito');
    }
    if(closeUser == true){
      this.props.cancel();
      this.props.changedClosed();
    }
    if(updateUser == true){
      this.props.changedSuccess();
      message.success('Se modifico con éxito');
    }
    if(number != undefined){
      numberPhone = number.substr(4);
      ladaPhone = number.substr(-14,4);
    }
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 10 },lg: { span: 9 },xl: { span: 7 }},
      wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 13 },lg: { span: 14 },xl: { span: 15  }}
    };
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
        title= {edit === false ? "Nuevo Usuario" : "Editar Usuario"}
        width={isMobile ? "100%" : "50%"}
        onClose={this.props.cancel}
        visible={this.props.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Spin spinning={loading}>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'register.label.name' })}>
                  { edit == false &&
                    getFieldDecorator('name', {rules: [{ required: true, message: <FormattedMessage id="register.mode.message.name"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('name', { initialValue: dataUser.name, rules: [{ required: true, message: <FormattedMessage id="register.mode.message.name"/>}]})(<Input/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'register.label.lastfam' })}>
                  { edit == false &&
                    getFieldDecorator('family_name',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastfam"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('family_name',{ initialValue: dataUser.family_name, rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastfam"/>}]})(<Input/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'register.label.lastmid' })}>
                  { edit == false &&
                    getFieldDecorator('middle_name',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastmid"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('middle_name',{ initialValue: dataUser.middle_name, rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastmid"/>}]})(<Input/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'register.label.email' })}>
                  { edit == false &&
                    getFieldDecorator('email',{ rules: [{ required: true, message: <FormattedMessage id="register.mode.message.email"/>},
                    { type: 'email', message: <FormattedMessage id="register.mode.message.email-inv"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('email',{ initialValue: dataUser.email, rules: [{ required: true, message: <FormattedMessage id="register.mode.message.email"/>},
                    { type: 'email', message: <FormattedMessage id="register.mode.message.email-inv"/>}]})(<Input disabled/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            { edit === false &&
              <span>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Password">
                      {getFieldDecorator('password', {
                        rules: [{required: true,message: '¡Por favor, introduzca su contraseña!'},{validator: this.validateToNextPassword,}]})
                      (<Input.Password />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Confirm Password">
                      {getFieldDecorator('confirm', {
                        rules: [{required: true,message: <FormattedMessage id="register.label.message.password"/>},{validator: this.compareToFirstPassword,}]})
                      (<Input.Password />)}
                  </Form.Item>
                  </Col>
                </Row>
              </span>
            }
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'register.label.phone' })}>
                  { edit == false &&
                    getFieldDecorator('phone_number', { rules: [{ required: true, message: <FormattedMessage id="register.mode.message.phone"/> },
                    { pattern: /^\d{10}$/, message: <FormattedMessage id="register.security.message.phone"/>}],})(<Input addonBefore={prefixSelector}/>)
                  }
                  { edit == true &&
                    getFieldDecorator('phone_number', { initialValue: numberPhone, rules: [{ required: true, message: <FormattedMessage id="register.mode.message.phone"/> },
                    { pattern: /^\d{10}$/, message: <FormattedMessage id="register.security.message.phone"/>}],})(<Input addonBefore={prefixSelector}/>)
                  }
                </Form.Item>
              </Col>
            </Row>
          </Spin>
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
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default Form.create()(ModalNewUser);