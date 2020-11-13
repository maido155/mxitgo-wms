import { Alert, Checkbox, Icon, message, Button, Divider} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import ModalChangePassword from '../login/components/Login/ModalChangePassword';
import ModalNewPassword from '../login/components/Login/ModalNewPassword';
import styles from './style.less';
/******/
import Amplify from 'aws-amplify'
import config from './../../../aws-config/cognito-config'
// import config from './../../../aws-exports'
Amplify.configure(config);
import { Auth } from 'aws-amplify'
import {
  FacebookOutlined,
  GoogleOutlined
} from '@ant-design/icons';
/******/
//import router from 'umi/router';
import { config as AWSConfig } from 'aws-sdk';
var AWS = require('aws-sdk');
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;
const AmazonCognitoIdentity  = require('amazon-cognito-identity-js');
//const Cognito = require('./../../../utils/Cognito.js');

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))

class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
    autoLogin: true,
    visible: false,
    visibleNew: false,
    user: {},
    userAttributes: {},
    loading: false,
    showLogin: false
  };
  componentDidMount(){
    if(localStorage.getItem('sessionActive') != 'null' && localStorage.getItem('isRemembered') === 'true'){
      window.location.href = '/dashboard';
    }
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  

  doLogin = async (_params) => {
    const { dispatch } = this.props;
    var isRemembered = this.state.autoLogin;
    let params=[];
    params.push(_params);
    params.push(isRemembered);
    try {
      dispatch({
        type: 'login/login',
        payload: params,
      });
     
    } catch (error) {
      console.log("*****Err");
      console.log(error);
    }
  };



  handleConfirmCode = () => {
   var self = this;
   let userName     = self.formRefDraw.props.form.getFieldValue('email');
   let code         = self.formRefDraw.props.form.getFieldValue('code');
   let newPassword  = self.formRefDraw.props.form.getFieldValue('newPassword');
   if(userName===undefined || code===undefined || newPassword===undefined){
    return; 
   }
    var poolData = {
      UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID, // your user pool id here "us-east-1_3ANmKhLSt"
      ClientId : ANT_DESIGN_PRO_CLIENT_ID // your app client id here "25h6ahb7sda3lvk1qs8v5u0ol0"
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username : userName, // your username here
      Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmPassword(code, newPassword,  {
      onSuccess: function (result) {
        message.success("Contraseña restaurada exitosamente!");
        self.handleCancel();
      },
      onFailure: function(err) {
        if(err){
          message.error(err.message);
        }
     }
    });
  }

  loginCognito(values){
    var self = this;

    var authenticationData = {
      Username : values.userName, 
      Password : values.userPassword
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
 
    var poolData = {
      UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID,
      ClientId : ANT_DESIGN_PRO_CLIENT_ID
    };
    // Create the User Pool Object
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username : values.userName, // your username here
      Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        var accessToken = result.getAccessToken().getJwtToken();
        var idToken     = result.idToken.jwtToken;
        sessionStorage.setItem('accessToken',accessToken);
        sessionStorage.setItem('idToken', idToken);
        let email = authenticationData.Username;
        let params = { email: email, Authorization: idToken}
        self.doLogin(params);
        


       //router.push(`/dashboard`);
      },
      onFailure: function(err) {
        if(err){
          message.error(err.message);
        }
      },
     
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        self.setState({
          visibleNew: true,
          userAttributes: userAttributes,
          user: cognitoUser
        });
      }
    });
  }
  handleSubmit = (err, values) => {
    const { type } = this.state;
    var self = this;
   
    if (!err) {
      const { dispatch } = this.props;
      localStorage.setItem('socialNetwork', "false");
     
       self.loginCognito(values);
      
      //  Cognito.loginCognito(values,{
        
      //       onSuccess: function (result) {
      //         /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
      //         var accessToken = result.getAccessToken().getJwtToken();
      //         var idToken     = result.idToken.jwtToken;
      //         sessionStorage.setItem('accessToken',accessToken);
      //         router.push(`/welcome`);
      //       },
      //       onFailure: function(err) {
      //         if(err){
      //           alert(err.message);
      //         }
      //       },
      //     });




    }
  };

  saveFormRefDraw = (formRef) => {
    this.formRefDraw = formRef;
  }
   showModal = () => {
    this.onResetLogin();

    this.setState({
      visible: true
    });
  };
  handleCancel = () => {    
     this.setState({
      visible: false
    });

    this.onResetModal();
  };
  
  onResetModal = () => {
    const form = this.formRefDraw.props.form;
    form.resetFields();
  };
  onResetLogin = () => {
    const form = this.loginForm;
    form.resetFields();
  };
  
  handleNewPassword = (pass) => {
    var self = this;
    let cognitoUserNew = this.state.user;
    let userAttributesNew = this.state.userAttributes;
    delete userAttributesNew.email_verified;
    delete userAttributesNew.phone_number_verified;
    cognitoUserNew.completeNewPasswordChallenge(pass, userAttributesNew, {
      onSuccess: function(result) {
        message.success("Contraseña cambiada exitosamente!");
        self.handleCancelNew();
      },
      onFailure: function(err) {
        message.error(err.message);
      },
    });
  }

  handleSubmitChangePassword= () => {
    const form = this.formRefDraw.props.form;
    let _self = this;
    form.validateFields((err, values) => {
        if (err) {
            console.log(err);
            return;
        }
        var authenticationData = {
          Username : values.email, 
          Password : values.oldUserPassword
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
     
        var poolData = {
          UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID,
          ClientId : ANT_DESIGN_PRO_CLIENT_ID,
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
          Username : values.email, // your username here
          Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
        AWS.config.update({ region: 'us-east-1', accessKeyId: 'AKIAWDTBANJH3M5N4UES', secretAccessKey: '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' });
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();



        var params = {
        ClientId:  ANT_DESIGN_PRO_CLIENT_ID, // required 
        Username: values.email, // required 
        };
        cognitoidentityserviceprovider.forgotPassword(params, function(err, data) {
        if (err){
          message.error(err.stack); // an error occurred
        }else{
          message.success("Enviamos un email para restaurar la contraseña: "+ data.CodeDeliveryDetails.Destination);  // successful response
        }  
      });
      

      // cognitoUser.authenticateUser(authenticationDetails, {
        //   onSuccess: function (result) {
        //     cognitoUser.changePassword(values.oldUserPassword, values.newUserPassword, function(err, result) {
        //       if (err) {
        //           alert(err.message || JSON.stringify(err));
        //           return;
        //       }
        //       message.success("Password changed successfully");
        //       _self.setState({
        //         visibleChangePassword : false
        //       })
        //   });
        //   },
        //   onFailure: function(err) {
        //     if(err){
        //       message.error(err.message);
        //     }
        //   },
        //   mfaRequired: function(codeDeliveryDetails) {
        //     var verificationCode = prompt('Please input verification code' ,'');
        //     cognitoUser.sendMFACode(verificationCode, this);
        //   }
        // });
    

    });
}
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
  render() {
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin, loading, showLogin } = this.state;
    return (
          <div className={styles.main}>
            <LoginComponents
            
            defaultActiveKey={type}
              onSubmit={this.handleSubmit}
              onCreate={form => {
                this.loginForm = form;
              }}
            >
              <ModalNewPassword 
                visible = {this.state.visibleNew}
                wrappedComponentRef = {this.saveFormRefDraw}
                onCancel={this.handleCancelNew}
                onNewPassword={this.handleNewPassword}
              />
              
                {status === 'error' &&
                  loginType === 'account' &&
                  !submitting &&
                  this.renderMessage(
                    formatMessage({
                      id: 'Tu usuario o contraseña son incorrectas',//'user-login.login.message-invalid-credentials'
                    }),
                  )}
                <UserName
                  name="userName"
                  placeholder={`${formatMessage({
                  id: 'login.email'
                  })}`}
                  rules={[
                    {
                      type: 'email', message: 'The input is not valid Email!',
                      required: true,
                      message: formatMessage({
                        id: 'register.mode.message.email', //'user-login.userName.required'
                      }),
                    },
                  ]}
                />
                <Password
                  name="userPassword"
                  placeholder={`${formatMessage({
                    id: 'login.pass',
                  })}`}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({
                        id: 'register.label.message.password', //'user-login.password.required'
                      }),
                    },
                  ]}
                  onPressEnter={e => {
                    e.preventDefault();

                    if (this.loginForm) {
                      this.loginForm.validateFields(this.handleSubmit);
                    }
                  }}
                />
            
              <div>
                <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                  <FormattedMessage id="login.remember.pass"//"user-login.login.remember-me"
                  />
                </Checkbox>
                <a
                  style={{
                    float: 'right',
                  }}
                  onClick={this.showModal}
                > 
                  <FormattedMessage id="login.forgot.pass" //"user-login.login.forgot-password"
                  /> 
                </a> 
                <ModalChangePassword
                    visible = {this.state.visible}
                    wrappedComponentRef = {this.saveFormRefDraw}
                    onCancel={this.handleCancel}
                    onChangePass={this.handleSubmitChangePassword}
                    onConfirmCode={this.handleConfirmCode}
                  />
              </div>
              <Submit loading={submitting}>
                <FormattedMessage id= "user-login.login.login" //"user-login.login.login"
                />
              </Submit>
              <div className={styles.other}>
                <Link className={styles.register} to="/user/register">
                  <FormattedMessage id="user-login.login.signup"//"user-login.login.signup"
                  />
                </Link>
              </div>
              <Divider plain><FormattedMessage id="login.login.with"/></Divider>
              <div className={styles.iconsSocial}>
                <Button type="primary"  className={styles.btnFb} onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}><FacebookOutlined />Facebook</Button>
                <Button type="danger"  className={styles.btnGo} onClick={() => Auth.federatedSignIn({ provider: "Google" })}><GoogleOutlined />Google</Button>
              </div>
            </LoginComponents>
          </div>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
