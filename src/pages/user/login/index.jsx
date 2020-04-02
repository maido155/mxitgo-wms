import { Alert, Checkbox, Icon, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import ModalChangePassword from '../login/components/Login/ModalChangePassword'
import styles from './style.less';
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
    userData: {},
    userAttributes: {}
  };
  

  doLogin = async (_params) => {
    const { dispatch } = this.props;
    try {
      dispatch({
        type: 'login/login',
        payload: _params,
      });
     
    } catch (error) {
      console.log("*****Err");
      console.log(error);
    }
  };

  handleForgotPassword = e => {
    this.setState({
      visibleChangePassword : true,
    });
  };

  handleConfirmCode = () => {
   var self = this;
   let userName     = self.formRefDraw.props.form.getFieldValue('email');
   let code         = self.formRefDraw.props.form.getFieldValue('code');
   let newPassword  = self.formRefDraw.props.form.getFieldValue('newPassword');
   if(userName==undefined || code==undefined || newPassword==undefined){
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
        message.success("Contrasea restaurada exitosamente!");
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
        let email = authenticationData.Username;
        let params = { email: email}
        self.doLogin(params);
        


       //router.push(`/dashboard`);
      },
      onFailure: function(err) {
        if(err){
          message.error(err.message);
        }
      },
      mfaRequired: function(codeDeliveryDetails) {
        var verificationCode = prompt('Please input verification code' ,'');
        cognitoUser.sendMFACode(verificationCode, this);
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new 
          // password and required attributes, if any, to complete 
          // authentication.

          // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
          // Required attributes according to schema, which don’t have any values yet, will have blank values.
          // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.


          // Get these details and call 
          // newPassword: password that user has given
          // attributesData: object with key as attribute name and value that the user has given.
          self.setState({
            visibleModal : true,
            userData: userData,
            userAttributes: userAttributes
          });

      }
    });
    

  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    var self = this;
    if (!err) {
      const { dispatch } = this.props;
      console.log(values);

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
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    console.log('jj');
    this.setState({
      visible: false
    });
  };
  
  
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
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
         
         defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          
          
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
               id: 'Correo electronico'
              })}: e@gmail.com`}
              rules={[
                {
                  type: 'email', message: 'The input is not valid Email!',
                  required: true,
                  message: formatMessage({
                    id: 'ingresa tu correo', //'user-login.userName.required'
                  }),
                },
              ]}
            />
            <Password
              name="userPassword"
              placeholder={`${formatMessage({
                id: 'contraseña',
              })}: James161210/`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'Ingresa tu contraseña', //'user-login.password.required'
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
              <FormattedMessage id="recordarme"//"user-login.login.remember-me"
               />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              onClick={this.showModal}
            > 
              <ModalChangePassword
                visible = {this.state.visible}
                wrappedComponentRef = {this.saveFormRefDraw}
                onCancel={this.handleCancel}
                onChangePass={this.handleSubmitChangePassword}
                onConfirmCode={this.handleConfirmCode}
              />
              <FormattedMessage id="olvidaste tu contraseña?" //"user-login.login.forgot-password"
              /> 
            </a> 
            
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id= "iniciar sesión" //"user-login.login.login"
             />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="Registrarme con"//"user-login.login.sign-in-with"
             />
            <Icon type="google-circle" className={styles.icon} theme="filled" />
            <Icon type="facebook" className={styles.icon} theme="filled" />
            <Icon type="github" className={styles.icon} theme="filled" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="Registrarme"//"user-login.login.signup"
               />
            </Link>
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
