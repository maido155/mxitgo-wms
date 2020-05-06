import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  componentDidMount() {
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
  };

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      localStorage.clear();
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    router.push(`/${key}`);
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
