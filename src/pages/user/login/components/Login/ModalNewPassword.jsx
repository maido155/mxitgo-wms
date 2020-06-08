import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {Form, Input, Button,Row,Col, Modal,Popover,Progress,LocaleProvider} from 'antd';
import styles from '../../../register/style.less'
import {isMobile} from 'react-device-detect';
const FormItem = Form.Item;

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
  
  const ModalNewPassword = Form.create()(
    class extends React.Component {
      state = {
        visibleHelp: false,
        help: '',
        confirmDirty: false,
        visibleFormCode: false,
      };   
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Las contraseñas no coinciden');
        } else {
          callback();
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
          const { visibleHelp, confirmDirty } = this.state;
          if(!value){
            this.setState({
              help: '¡Por favor, introduzca su contraseña!', visibleHelp: !!value
            });
            callback('error');
          }else{
            this.setState({
              help: ''
            });
            if(!visibleHelp){
              this.setState({
                visibleHelp: !!value
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
        onSubmitNewPass = e => {
          e.preventDefault();
          const { onNewPassword } = this.props;
          this.props.form.validateFields((err, values) => {
            if (!err) {
              this.setState({visibleHelp:false});
              let password = values.password;
              onNewPassword(password);
            }
          })
        }
        render() {
            const {  form } = this.props;
            const { getFieldDecorator } = form;
            const { visibleHelp, help} = this.state;
            const formItemLayout = {
                labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 24 },lg: { span: 9 },xl: { span: 9 }},
                wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 24 },lg: { span: 12 },xl: { span: 10  }}
            };
            return (
              <LocaleProvider locale={en_US}>  
                <Modal
                    visible={this.props.visible}
                    title="Nueva Contraseña"
                    width={isMobile ? "100%" : "40%"}
                    footer={null}
                    closable={false}
                >
                  <Form   {...formItemLayout} onSubmit={(this.onSubmitNewPass)}>
                    <Row>
                      <Col span={24}>
                        <FormItem help={help} label="Nueva contraseña">
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
                            visible={visibleHelp}
                          >
                            {getFieldDecorator('password', {rules: [{required: true, message: 'Por favor ingresa tu nueva contraseña'},
                              { validator: this.checkPassword }]})(<Input.Password/>
                            )}
                          </Popover>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem label="Confirmar contraseña">
                          {getFieldDecorator('newPassword', {rules: [{required: true, message: 'Por favor ingresa tu nueva contraseña'},
                            {validator: this.compareToFirstPassword}]})(<Input.Password/>
                          )}
                      </FormItem>    
                      </Col>
                    </Row> 
                    <Row type="flex" justify="center">
                      <Col xs={24} lg={19} xl={15} style={{textAlign: "right"}}>
                        <Button type="primary" htmlType="submit">
                          Cambiar contraseña
                        </Button>  
                      </Col>
                    </Row>                      
                  </Form> 
                </Modal>
              </LocaleProvider>
            );
        }
    }
);
export default ModalNewPassword;