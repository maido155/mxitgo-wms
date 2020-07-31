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
      callback(formatMessage({ id: 'usersModule.modal.message_confpass' }));
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
      callback(formatMessage({ id: 'usersModule.modal.password_uppercase' }))
    }
    if(lowerCase == false){
      callback(formatMessage({ id: 'usersModule.modal.password_lowercase' }))
    }
    if(number == false){
      callback(formatMessage({ id: 'usersModule.modal.password_number' }))
    }
    if(character == false){
      callback(formatMessage({ id: 'usersModule.modal.password_character' }))
    }
    if(value.length < 8){
      callback(formatMessage({ id: 'usersModule.modal.password_length' }))
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
      message.success(formatMessage({ id: 'usersModule.notification.success' }));
    }
    if(closeUser == true){
      this.props.cancel();
      this.props.changedClosed();
    }
    if(updateUser == true){
      this.props.changedSuccess();
      message.success(formatMessage({ id: 'usersModule.notification.edit' }));
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
        <Option value="+521"><FormattedMessage id="usersModule.modal.select_one"/></Option>
        <Option value="+522"><FormattedMessage id="usersModule.modal.select_two"/></Option>
      </Select>,
    );
    return(
      <Drawer
        title= {edit === false ? formatMessage({ id: 'usersModule.modal.modal_name' }) : formatMessage({ id: 'usersModule.modal.modal_name_edit' })}
        width={isMobile ? "100%" : "50%"}
        onClose={this.props.cancel}
        visible={this.props.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Spin spinning={loading}>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'usersModule.modal.name' })}>
                  { edit == false &&
                    getFieldDecorator('name', {rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_name"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('name', { initialValue: dataUser.name, rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_name"/>}]})(<Input disabled={numberPhone == "" ? true : false}/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'usersModule.modal.family_name' })}>
                  { edit == false &&
                    getFieldDecorator('family_name',{ rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_family"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('family_name',{ initialValue: dataUser.family_name, rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_family"/>}]})(<Input disabled={numberPhone == "" ? true : false}/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'usersModule.modal.middle_name' })}>
                  { edit == false &&
                    getFieldDecorator('middle_name',{ rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_middle"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('middle_name',{ initialValue: dataUser.middle_name, rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_middle"/>}]})(<Input disabled={numberPhone == "" ? true : false}/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'usersModule.modal.email' })}>
                  { edit == false &&
                    getFieldDecorator('email',{ rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_email"/>},
                    { type: 'email', message: <FormattedMessage id="usersModule.modal.message_email_err"/>}]})(<Input/>)
                  }
                  { edit == true &&
                    getFieldDecorator('email',{ initialValue: dataUser.email, rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_email"/>},
                    { type: 'email', message: <FormattedMessage id="usersModule.modal.message_email_err"/>}]})(<Input disabled/>)
                  }
                </Form.Item>
              </Col>
            </Row>
            { edit === false &&
              <span>
                <Row>
                  <Col span={24}>
                    <Form.Item label={formatMessage({ id: 'usersModule.modal.password' })}>
                      {getFieldDecorator('password', {
                        rules: [{required: true,message: <FormattedMessage id="usersModule.modal.message_pass"/>},{validator: this.validateToNextPassword,}]})
                      (<Input.Password />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label={formatMessage({ id: 'usersModule.modal.conf_password' })}>
                      {getFieldDecorator('confirm', {
                        rules: [{required: true,message: <FormattedMessage id="usersModule.modal.message_pass"/>},{validator: this.compareToFirstPassword,}]})
                      (<Input.Password />)}
                  </Form.Item>
                  </Col>
                </Row>
              </span>
            }
            <Row>
              <Col span={24}>
                <Form.Item label={formatMessage({ id: 'usersModule.modal.phone' })}>
                  { edit == false &&
                    getFieldDecorator('phone_number', { rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_phone"/> },
                    { pattern: /^\d{10}$/, message: <FormattedMessage id="usersModule.modal.message_phone_err"/>}],})(<Input addonBefore={prefixSelector}/>)
                  }
                  { edit == true &&
                    getFieldDecorator('phone_number', { initialValue: numberPhone, rules: [{ required: true, message: <FormattedMessage id="usersModule.modal.message_phone"/> },
                    { pattern: /^\d{10}$/, message: <FormattedMessage id="usersModule.modal.message_phone_err"/>}],})(<Input addonBefore={prefixSelector} disabled={numberPhone == "" ? true : false}/>)
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
              <FormattedMessage id="usersModule.modal.cancel"/>
            </Button>
            <Button type="primary" htmlType="submit">
            <FormattedMessage id="usersModule.modal.save"/>
              </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default Form.create()(ModalNewUser);