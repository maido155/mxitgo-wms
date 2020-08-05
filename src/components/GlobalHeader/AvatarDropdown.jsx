import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
/******/
import Amplify from 'aws-amplify'
import config from './../../aws-config/cognito-config'
// import config from './../../aws-exports'
Amplify.configure(config);
import { Auth } from 'aws-amplify'
/******/
class AvatarDropdown extends React.Component {
  async componentDidMount() {
    try {
      if(localStorage.getItem('socialNetwork') == "false"){
        const user = await Auth.currentAuthenticatedUser();
        localStorage.setItem('userId', user.username);
        localStorage.setItem('emailVerified', user.attributes.email_verified);
        localStorage.setItem('userName', user.attributes.name);
        localStorage.setItem('middleName', user.attributes.middle_name);
        localStorage.setItem('familyName', user.attributes.family_name);
        localStorage.setItem('email', user.attributes.email);
        localStorage.setItem('isRemembered', "true");
        localStorage.setItem('socialNetwork', "false");
        this.props.dispatch({
          type: 'user/fetchUserByEmail',
          payload: {
              payload: {
                  email: localStorage.getItem('email'),
                  Authorization: sessionStorage.getItem('idToken')
              }
          },
        });
        this.props.dispatch({
          type: 'user/fetchAvatarUser',
          payload: {
              payload: {
                  user: localStorage.getItem('email'),
                  Authorization: sessionStorage.getItem('idToken')
              }
          },
        });
      }else{
        let user = await Auth.currentAuthenticatedUser();
        localStorage.setItem('userId', user.username);
        localStorage.setItem('emailVerified', user.attributes.email_verified);
        localStorage.setItem('userName', user.attributes.name);
        localStorage.setItem('middleName', user.attributes.middle_name);
        localStorage.setItem('familyName', user.attributes.family_name);
        localStorage.setItem('email', user.attributes.email);
        localStorage.setItem('isRemembered', "true");
        localStorage.setItem('socialNetwork', "true");
        sessionStorage.setItem('idToken',user.storage["CognitoIdentityServiceProvider.66vntbnp4mpgn1o1p50pqd43kl.Facebook_3220880598031191.idToken"]);
        sessionStorage.setItem('accessToken',user.storage["CognitoIdentityServiceProvider.66vntbnp4mpgn1o1p50pqd43kl.Facebook_3220880598031191.accessToken"]);
        this.props.dispatch({
          type: 'user/fetchUserByEmail',
          payload: {
              payload: {
                  email: localStorage.getItem('email'),
                  Authorization: sessionStorage.getItem('idToken')
              }
          },
        });
        this.props.dispatch({
          type: 'user/fetchAvatarUser',
          payload: {
              payload: {
                  user: localStorage.getItem('email'),
                  Authorization: sessionStorage.getItem('idToken')
              }
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      localStorage.removeItem('userId');
      localStorage.removeItem('emailVerified');
      localStorage.removeItem('userName');
      localStorage.removeItem('phoneNumberVerified');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('middleName');
      localStorage.removeItem('familyName');
      localStorage.removeItem('email');
      localStorage.removeItem('socialNetwork');
      localStorage.removeItem('antd-pro-authority');
      localStorage.setItem('sessionActive', null);
      Auth.signOut();
            //   if (dispatch) {
      //     dispatch({
      //       type: 'login/logout',
      //     });
      //   }
      //   return;
    }else{
      router.push(`/${key}`);
    }
  };

  render() {
    const {
      userByEmail = {
        name: ''
      },
      avatarUser = {
        urlImage: ''
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="settings">
          <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>

        <Menu.Item key="logout">
          <Icon type="logout" />
            <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return userByEmail && userByEmail.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatarUser.urlImage} alt="avatar" />
          <span className={styles.name}>{userByEmail.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
  userByEmail:user.userByEmail,
  avatarUser:user.avatarUser
}))(AvatarDropdown);
