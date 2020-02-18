import React, { Component } from 'react';
import { Input, Popover, Form, Progress, Icon, Button, message, Select} from 'antd';
import styles from './style.less';
import Link from 'umi/link';

const FormItem = Form.Item;
const Cognito = require('./../../../utils/Cognito.js');
const { Option } = Select;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      Contraseña: fuerte
    </div>
  ),
  poor: (
    <div className={styles.error}>
      Contraseña: Demasiado corta
    </div>
  ),
  uppercase: (
    < div className={styles.error}>
       Al menos debe tener 1 letra mayúscula
    </div>
  ),
  characters: (
    < div className={styles.error}>
       Al menos debe tener 1 character
    </div>
  ),
  numbers: (
    <div className={styles.error}>
      Al menos debe tener un numero
    </div>
  ),
  lowercase: (
    <div className={styles.error}>
      Al menos debe tener una minuscula
    </div>
  )
};

const passwordProgressMap: {
  ok: 'success';
  poor: 'exception';
}={
  ok: 'success',
  poor: 'exception',
};

class Register extends Component{

  state = {
    visible: false,
    help: ''
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if(!this.hasUpperCase(value)){
      return 'uppercase';
    }
    if(!this.hasCharacters(value)){
      return 'characters';
    }
    if(!this.hasNumbers(value)){
      return 'numbers';
    }
    if(!this.hasLowerCase(value)){
      return 'lowercase';
    }
    if(value && value.length < 8){
      return 'poor';
    }
    return 'ok'; 
  }

  hasUpperCase = (str) => {
    return (/[A-Z]/.test(str));
  }

  hasCharacters = (str) => {
    return (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str));
  }
  
  hasNumbers = (str) => {
    return (/[0-9]/.test(str));
  }

  hasLowerCase = (str) => {
    return (/[a-z]/.test(str));
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={8}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false} 
        />
      </div>
    ) : null;
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        Cognito.signUpCognito(values).then(function(data){
          var cognitoUser = data.user;
          var destination = data.codeDeliveryDetails.Destination;
        }).catch(function(err) {
          message.error(err.message || JSON.stringify(err));
        });
      }
    });
  };

  checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { visible, confirmDirty } = this.state;
    if(!value){
      this.setState({
        help: '¡Por favor, introduzca su contraseña!', visible: !!value
      });
      callback('error');
    }else{
      this.setState({
        help: ''
      });
      if(!visible){
        this.setState({
          visible: !!value
        });
      }
      if(value.length < 8){
        callback('error');
      }else{
        const { form } = this.props;
        if( value && confirmDirty){
          form.validateFields(['confirm'], { force: true});
        }
        callback();
      }
    }
  };

  checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('¡Las contraseñas ingresadas no coinciden!');
    } else {
      callback();
    }
  };

  render(){

    const { form,submitting } = this.props;
    const { getFieldDecorator } = form;
    const { visible, help } = this.state;

    return(
      <div className={styles.main}>
        <div>
          <h3>Registrar</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Ingresa tu nombre!'}]
              })(<Input size="large" placeholder={'Nombre(s)'}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('family_name',{
                rules: [{ required: true, message: 'Ingresa tu apellido paterno!'}]
              })(<Input size="large" placeholder={'Apellido Paterno'}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('middle_name',{
                rules: [{ required: true, message: 'Ingresa tu apellido materno!'}]
              })(<Input size="large" placeholder={'Apellido Materno'}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email',{
                rules: [{ required: true, message: 'Ingresa tu correo electronico!'},
                        { type: 'email', message: 'Este correo no es valido!'}]
              })(<Input size="large" placeholder={'Correo Electronico'}
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </FormItem>
            <FormItem help={help}>
              <Popover
                getPopupContainer={node => {
                  if (node && node.parentNode){
                    return node.parentNode as HTMLElement;
                  }
                  return node;
                }}
                content={
                  <div style={{ padding: '4px 0'}}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10}}>
                      Ingrese al menos 8 caracteres y no use contraseñas que sean fáciles de adivinar.
                    </div>
                  </div>
                }
                overlayStyle={{ width: 240}}
                placement = "right"
                visible={visible}
              >
                {getFieldDecorator('password', {
                  rules: [{ validator: this.checkPassword }]
                })(<Input size="large" type="password" placeholder={'Contraseña'}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />,)}
              </Popover>
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [{ required: true, message: '¡Por favor, confirme su contraseña!'},
                        { validator: this.checkConfirm }]
              })(<Input size="large" type="password" placeholder={'Ingrese de nuevo la contraseña'}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('phone_number', {
                rules: [{ required: true, message: 'Por favor ingrese su número de teléfono!' }],
              })(<Input size="large" placeholder="+5211234567"
                  prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                />)}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                Registrar
              </Button>
              <Link className={styles.login} to="/user/login">
                ¿Ya tienes una cuenta?
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Register);