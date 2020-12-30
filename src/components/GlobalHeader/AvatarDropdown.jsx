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

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      localStorage.clear();
      sessionStorage.clear();
      Auth.signOut();
         if (dispatch) {
           dispatch({
             type: 'login/logout',
           });
         }
         return;
    } else {
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
    // const userSimplify = userByEmail.name ? (userByEmail.name.split(" ")[0].substr(0, 1) + "" + userByEmail.name.split(" ")[1].substr(0, 1)) : "";

    let styleNoImage = {
      backgroundColor: '#64a9dd'
    }
    let styleNoImageColorText = {
      // backgroundColor: '#64a9dd',
      color: "#fff"
    }


    if (avatarUser.urlImage) {
      styleNoImage = {
        backgroundColor: '#64a9dd00'
      }
      // styleNoImageColorText = {
      //   color: "#fff"
      // }
    }

    return userByEmail && userByEmail.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatarUser.urlImage} alt="avatar" style={styleNoImage}>
            <div style={styleNoImageColorText}>
              {userByEmail.name.substr(0, 1)}
            </div>
          </Avatar>
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
  userByEmail: user.userByEmail,
  avatarUser: user.avatarUser
}))(AvatarDropdown);
