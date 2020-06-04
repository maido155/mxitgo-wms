/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import { Alert, Checkbox, Icon, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import ModalChangePassword from '../login/components/Login/ModalChangePassword'
import styles from './style.less';

const AWS = require('aws-sdk');

const {  UserName, Password, Submit } = LoginComponents;
const AmazonCognitoIdentity  = require('amazon-cognito-identity-js');
// const Cognito = require('./../../../utils/Cognito.js');

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

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  

  doLogin = async _params => {
    const { dispatch } = this.props;
    try {
      dispatch({
        type: 'login/login',
        payload: _params,
      });
     
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("*****Err");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };



  handleConfirmCode = () => {
   const self = this;
   const userName     = self.formRefDraw.props.form.getFieldValue('email');
   const code         = self.formRefDraw.props.form.getFieldValue('code');
   const newPassword  = self.formRefDraw.props.form.getFieldValue('newPassword');
   // eslint-disable-next-line eqeqeq
   if(userName==undefined || code==undefined || newPassword==undefined){
    return; 
   }
    const poolData = {
      // eslint-disable-next-line no-undef
      UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID, // your user pool id here "us-east-1_3ANmKhLSt"
      // eslint-disable-next-line no-undef
      ClientId : ANT_DESIGN_PRO_CLIENT_ID // your app client id here "25h6ahb7sda3lvk1qs8v5u0ol0"
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username : userName, // your username here
      Pool : userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmPassword(code, newPassword,  {
      onSuccess () {
        message.success("Contraseña restaurada exitosamente!");
        self.handleCancel();
      },
      onFailure(err) {
        if(err){
          message.error(err.message);
        }
     }
    });
  }

  loginCognito(values){
    const self = this;

    const authenticationData = {
      Username : values.userName, 
      Password : values.userPassword
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
 
    const poolData = {
      UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID,
      ClientId : ANT_DESIGN_PRO_CLIENT_ID
    };
    // Create the User Pool Object
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username : values.userName, // your username here
      Pool : userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken     = result.idToken.jwtToken;
        sessionStorage.setItem('accessToken',accessToken);
        sessionStorage.setItem('idToken', idToken);
        const email = authenticationData.Username;
        const params = { email: email, Authorization: idToken}
        self.doLogin(params);
        


       //router.push(`/dashboard`);
      },
      onFailure: function(err) {
        if(err){
          message.error(err.message);
        }
      },
     
      newPasswordRequired: function(userAttributes) {
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
            userData,
            userAttributes
          });

      }
    });
    

  }

  handleSubmit = values => {
    //const self = this;
   

    this.loginCognito(values);
    
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

    this.onReset();
  };
  
  onReset = () => {
    const form = this.formRefDraw.props.form;
    form.resetFields();

    console.log('jj');
    console.log('jj');
  };

 handleSubmitChangePassword= () => {
    const form = this.formRefDraw.props.form;
    form.validateFields((err, values) => {
        if (err) {
            console.log(err);
            return;
        }
        const authenticationData = {
          Username : values.email, 
          Password : values.oldUserPassword
        };
     
        const poolData = {
          UserPoolId : ANT_DESIGN_PRO_USER_POOL_ID,
          ClientId : ANT_DESIGN_PRO_CLIENT_ID,
        };
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
          Username : values.email, // your username here
          Pool : userPool
        };
  
        AWS.config.update({ region: 'us-east-1', accessKeyId: 'AKIAWDTBANJH3M5N4UES', secretAccessKey: 'j3KULxz8JIHU43VsYEsSwCbwYfhaV16x+EIoj3Su' });
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();



        const params = {
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
              })}`}
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
              })}`}
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
              <FormattedMessage id="olvidaste tu contraseña?" //"user-login.login.forgot-password"
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
