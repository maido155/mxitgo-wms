import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Icon, Input, Upload, Button,Row,Col, Modal, Select,Popover,Progress, message,Divider, LocaleProvider,Password
} from 'antd';
import styles from '../../../register/style.less'
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
const Option = Select.Option;

const Dragger = Upload.Dragger;

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
  
  const passwordProgressMap= {
    ok: 'success',
    poor: 'exception',
  };
  

const ModalChangePassword = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
    
            this.state = {
                visible2: false,
                help: '',
                confirmDirty: false,
                visibleFormCode: false,
                disabledBtnSendMail: false
            };
        }
        
        validateToOldPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value == form.getFieldValue('newUserPassword')) {
              callback('The password should different to the old password!');
            } else {
              callback();
            }
        }        
        compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
              callback('Two passwords that you enter is inconsistent!');
            } else {
             callback();
            }
        }
        validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
              form.validateFields(['userConfirmPassword'], { force: true });
            }
            callback();
        }
        handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }
        handleNewPasswordBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }
        onClickChangePassword = (e) => {
            const { onChangePass } = this.props;
            this.setState({visibleFormCode:true, disabledBtnSendMail:true});
            onChangePass();
        }
        onClickConfirmCode = () => {
            const { onConfirmCode } = this.props;
            let code        = this.props.form.getFieldValue('code');
            let newPassword = this.props.form.getFieldValue('newPassword');
            let email       = this.props.form.getFieldValue('email');
            if(code!=''&&newPassword!=''){
                onConfirmCode(code,newPassword,email);
            }
        }

        renderPasswordProgress = () => {
            const form  = this.props.form;
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

        checkPassword = (rule, value, callback) => {
            const { visible2, confirmDirty } = this.state;
            if(!value){
              this.setState({
                help: '¡Por favor, introduzca su contraseña!', visible2: !!value
              });
              callback('error');
            }else{
              this.setState({
                help: ''
              });
              if(!visible2){
                this.setState({
                  visible2: !!value
                });
              }
              if(value.length < 8){
                callback('error');
              }else{
                const form  = this.props.form;
                if( value && confirmDirty){
                  form.validateFields(['confirm'], { force: true});
                }
                callback();
              }
            }
          };
        

        getPasswordStatus = () => {
            const form = this.props.form;
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
        
        
        
        
        
        render() {
            const {  form } = this.props;
            const { getFieldDecorator } = form;
            
            const { visibleFormCode,disabledBtnSendMail, visible2, help, visibleResultSuccess, titleResultSuccess, subTitleResultSuccess, dataresult } = this.state;
            const formItemLayout = {
                labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 8 }},
                wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 10  }}
            };
          
            //const options = this.props.presalesList.map(d => <Option key={d.userid}>{d.userName}</Option>);


            return (
                <LocaleProvider locale={en_US}>
                    
                <Modal
                    visible={this.props.visible}
                    title="Olvidaste tu contraseña?"
                    //okText="Change"
                    cancelText="Cancel"
                    onCancel={this.props.onCancel}
                    okButtonProps={{ style: { display: 'none' } }}
                    // onOk={onChangePassword}
                  
                >



                <Form   {...formItemLayout}>
               
                        <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', required: true, message: 'Por favor ingresa tu correo!',
                        }],
                        })(
                            <Input type="email" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem> 
                    <Row>
                            <Col xs={24}sm={9}md={9}lg={9}xl={8}></Col>
                            <Col>
                       <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.onClickChangePassword} disabled={disabledBtnSendMail}>
                        Enviar correo
                    </Button>
                    </Form.Item>
                   
                    </Col>
                    </Row>
                    </Form>

                    <Form   {...formItemLayout}>

                    { visibleFormCode==true &&
                      <div>
                            <Divider></Divider>
                                    <FormItem label="Código">
                                        {getFieldDecorator('code', {
                                            rules: [{
                                              required: true, message: 'Por favor ingresa tu código!',
                                        }],
                                        })(
                                            <Input type="text" onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </FormItem>
                                    <FormItem help={help} label="Confirmar contraseña">
                                        <Popover
                                          
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
                                            visible={visible2}
                                        >
                                            {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Por favor ingresa tu nueva contraseña'},
                                                { validator: this.checkPassword }]
                                            })(<Input.Password
                                            />
                                            )}
                                        </Popover>
                                    </FormItem>
                                    <FormItem label="Confirmar contraseña">
                                        {getFieldDecorator('newPassword', {
                                            rules: [
                                                {required: true, message: 'Por favor ingresa tu nueva contraseña'},
                                                {
                                                validator: this.compareToFirstPassword,
                                                }],
                                        })(
                                            // <Input type="text" onBlur={this.handleConfirmBlur}/>
                                            <Input.Password                                         
                                            />
                                        )}
                                    </FormItem>                                       
                        
                                    <Row>
                            <Col xs={24}sm={9}md={9}lg={9}xl={8}></Col>
                            <Col>           
                          
                         <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={this.onClickConfirmCode}>
                                Cambiar contraseña
                            </Button>
                         </Form.Item>
                      </Col>
                      </Row>
                   
                     </div>
                    }
                </Form>
                
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalChangePassword;





